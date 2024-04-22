import { Request, Response } from "express"

export class UserController {
  public static async getUsers(_req: Request, res: Response){
    try {
      return res.status(200).json([])
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createUser(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
  
  public static async getUser(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateUser(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteUser(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
