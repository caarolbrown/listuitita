import { Request, Response } from "express"
//import { UserServiceMock } from "./user.service.mock"
import UserServiceInterface from "./user.service.interface"
import User from "./user.model"
import HttpCode from "../httpCode/httpCode.model"
import { AppError } from "../error/error"
import { UserServiceDB } from "./user.service.db"
import { UserFilterBy } from "../models/filter"

export class UserController {
  public static async getUsers(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceDB()
      const email: string | undefined = req.query.email ? String(req.query.email) : undefined
      const userFilterBy: UserFilterBy = new UserFilterBy(email)
      const users = await userService.getUsers(userFilterBy)
      return res.status(HttpCode.Ok).json(users)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async createUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceDB()
      let newUser: User = new User(
        -1,
        req.body.email,
        req.body.password,
        false
      )
      newUser = await userService.createUser(newUser)
      return res.status(HttpCode.Ok).json(newUser)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async getUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceDB()
      const user = await userService.getUser(+req.params.id)
      return res.status(HttpCode.Ok).json(user)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceDB()
      let updatedUser: User = new User(
        +req.params.id,
        req.body.email,
        req.body.password,
        req.body.deleted
      )
      updatedUser = await userService.updateUser(updatedUser)
      return res.status(HttpCode.Ok).json(updatedUser)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceDB()
      let deletedUser: User = new User(
        +req.params.id,
        req.body.email,
        req.body.password,
        req.body.deleted
      )
      deletedUser = await userService.deleteUser(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedUser)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
