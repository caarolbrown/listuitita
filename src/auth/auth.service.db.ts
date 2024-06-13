import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { UserFilterBy } from "../models/filter";
import User from "../users/user.model";
import { UserServiceDB } from "../users/user.service.db";
import AuthServiceInterface from "./auth.service.interface";
import jwt from 'jsonwebtoken';

export class AuthServiceDB implements AuthServiceInterface {
  async login(email: string, password: string): Promise<string> {
    try {
      const userService: UserServiceDB = new UserServiceDB()
      const filterBy: UserFilterBy = new UserFilterBy(email)

      const users: User[] = await userService.getUsers(filterBy)
      if (users.length === 0) {
        throw new AppError("Bad Request", HttpCode.BadRequest, "User not found")
      }

      const user = users[0]

      if (password === user.password) {
        const payload = { email: user.email }
        if (!process.env.SECRET) {
          throw new AppError("Bad Request", HttpCode.BadRequest, "Not found")
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
        return token
      }
      throw new AppError("Bad Request", HttpCode.BadRequest, "Invalid password")

    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }
}