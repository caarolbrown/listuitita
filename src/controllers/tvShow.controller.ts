import { Request, Response } from "express"

export class TvShowController {
  public static async getTvShows(_req: Request, res: Response){
    try {
      return res.status(200).json([])
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createTvShow(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getTvShow(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateTvShow(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteTvShow(_req: Request, res: Response){
    try {
      return res.status(200).json({})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
