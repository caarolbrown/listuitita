import { Request, Response } from "express"

export class MovieController {
  public static async getMovies(_req: Request, res: Response) {
    try {
      return res.status(200).json([])
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createMovie(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getMovie(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateMovie(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteMovie(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}