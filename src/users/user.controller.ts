import { Request, Response } from "express"
import { UserServiceMock } from "./user.service.mock"
import UserServiceInterface from "./user.service.interface"
import User from "./user.model"
import HttpCode from "../httpCode/httpCode.model"
import { AppError } from "../error/error"

export class UserController {
  public static async getUsers(_req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      const users = userService.getUsers()
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
      const userService: UserServiceInterface = new UserServiceMock()
      let newUser: User = new User(
        -1,
        req.body.email,
        req.body.password
      )
      newUser = userService.createUser(newUser)
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
      const userService: UserServiceInterface = new UserServiceMock()
      const user = userService.getUser(+req.params.id)
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
      const userService: UserServiceInterface = new UserServiceMock()
      let updatedUser: User = new User(
        +req.params.id,
        req.body.email,
        req.body.password
      )
      updatedUser = userService.updateUser(updatedUser)
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
      const userService: UserServiceInterface = new UserServiceMock()
      let deletedUser: User = new User(
        +req.params.id,
        req.body.email,
        req.body.password
      )
      deletedUser = userService.deleteUser(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedUser)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
