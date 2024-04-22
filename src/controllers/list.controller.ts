import { Request, Response } from "express";

export class ListController {
  public static async getLists(_req: Request, res: Response){
    try {
      return res.status(200).json([])
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createList(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getList(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateList(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteList(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
