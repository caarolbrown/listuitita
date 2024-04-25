import { Request, Response } from "express"
import { UserServiceMock } from "../services/user.service.mock"
import UserServiceInterface from "../services/user.service.interface"
import User from "../models/user"

export class UserController {
  public static async getUsers(_req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      const users = userService.getUsers()
      return res.status(201).json(users)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      let newUser: User | undefined = new User(
        -1,
        req.body.email,
        req.body.password
      )
      newUser = userService.createUser(newUser)
      if (newUser instanceof User) {
        return res.status(201).json(newUser)
      } else {
        return res.status(401).send({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      const user = userService.getUser(+req.params.id)
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      let updatedUser: User | undefined = new User(
        +req.params.id,
        req.body.email,
        req.body.password
      )
      updatedUser = userService.updateUser(updatedUser)
      if (updatedUser instanceof User) {
        return res.status(201).json(updatedUser)
      } else {
        return res.status(401).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      const userService: UserServiceInterface = new UserServiceMock()
      let deletedUser: User | undefined = new User(
        +req.params.id,
        req.body.email,
        req.body.password
      )
      deletedUser = userService.deleteUser(+req.params.id)
      if (deletedUser instanceof User) {
        return res.status(201).json(deletedUser)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
