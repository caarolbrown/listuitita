import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import User from "./user.model";
import UserServiceInterface from "./user.service.interface";

export class UserServiceMock implements UserServiceInterface {

  users: User[]

  constructor() {
    this.users = []
    this.users.push(new User(
      1,
      "email@email.com",
      "password",
      false
    ))
    this.users.push(new User(
      2, 
      "email2@email.com",
      "password2",
      false
    ))
  }
  async getUsers(): Promise<User[]> {
    return this.users
  }

  async createUser(newUser: User): Promise<User> {
    for (const user of this.users) {
      if (user.email === newUser.email) {
        throw new AppError('User already exists', HttpCode.BadRequest, `User with this email: ${newUser.email} already exists`)
      }
    }

    this.users.push(newUser)
    this.users[this.users.length -1].id = this.users.length
    return this.users[this.users.length -1]
  }

  async getUser(id: number): Promise<User> {
    for (const user of this.users) {
      if (user.id === id)
        return user
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${id} was not found`)
  }

  async updateUser(updatedUser: User): Promise<User> {
    for (const user of this.users) {
      if (updatedUser.id === user.id) {
        return updatedUser
      }
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${updatedUser.id} was not found`)
  }

  async deleteUser(id: number): Promise<User> {
    for (const user of this.users) {
      if (user.id === id) {
        user.deleted = true
        return user
      }
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${id} was not found`)
  }
}
