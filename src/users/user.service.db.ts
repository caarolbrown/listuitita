import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import User from "./user.model";
import UserServiceInterface from "./user.service.interface";
import { connect } from "ts-postgres";

export class UserServiceDB implements UserServiceInterface {
  async getUsers(): Promise<User[]> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT * FROM users"
      )
      const users: User[] = []
      for (const row of result.rows) {
        users.push(new User(
          row.get('id'),
          row.get('email'),
          row.get('password'),
          row.get('deleted')
        ))
      }
      return users
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async createUser(newUser: User): Promise<User> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING id", [newUser.email, newUser.password]
      )
      const user: User = new User(
        result.rows[0].get('id'),
        newUser.email,
        newUser.password,
        newUser.deleted
      )
      return user
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async getUser(id: number): Promise<User> {
    try {      
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT * FROM users WHERE id = $1", [id]
      )
      let user: User = new User(
        result.rows[0].get('id'),
        result.rows[0].get('email'),
        result.rows[0].get('password'),
        result.rows[0].get('deleted')
      )
      return user
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async updateUser(updateUser: User): Promise<User> {
    try {      
      const client = await this.connectDB()
      await client.query(
        "UPDATE users SET email = $1, password = $2 WHERE id = $3", [updateUser.email, updateUser.password, updateUser.id]
      )
      return updateUser
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {      
      const client = await this.connectDB()
      const result = await client.query(
        "UPDATE users SET deleted = true WHERE id = $1 RETURNING id, email, password, deleted", [id]
      )
      const user: User = new User(
        result.rows[0].get('id'),
        result.rows[0].get('email'),
        result.rows[0].get('password'),
        result.rows[0].get('deleted')
      )
      return user
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  private async connectDB() {
    return await connect({
      "host": process.env.DB_HOST,
      "port": Number(process.env.DB_PORT),
      "user": process.env.DB_USER,
      "database": process.env.DB_DATABASE,
      "password": process.env.DB_PASSWORD
    })
  }
}