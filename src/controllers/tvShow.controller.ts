import { Request, Response } from "express"
import TvShowServiceInterface from "../services/tvShow.service.interface"
import { TvShowServiceMock } from "../services/tvShow.service.mock"
import TvShow from "../models/tvShow"

export class TvShowController {
  public static async getTvShows(_req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      const tvShows = tvShowService.getTvShows()
      return res.status(201).json(tvShows)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      let newTvShow: TvShow | undefined = new TvShow(
        -1, 
        req.body.title
      )
      newTvShow = tvShowService.createTvShow(newTvShow)
      if (newTvShow instanceof TvShow) {
        return res.status(201).json(newTvShow)
      } else {
        return res.status(400).json({ message: "Bad Request"} )
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getTvShow(req: Request, res: Response){
    try {
    const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
    const tvShow = tvShowService.getTvShow(+req.params.id)
      return res.status(200).json(tvShow)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      let updatedTvShow: TvShow | undefined = new TvShow (
        +req.params.id,
        req.body.title
      )
      updatedTvShow = tvShowService.updateTvShow(updatedTvShow)
      if (updatedTvShow instanceof TvShow) {
        return res.status(201).json(updatedTvShow)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      let deletedTvShow: TvShow | undefined = new TvShow(
        +req.params.id,
        req.body.title
      )
      deletedTvShow = tvShowService.deleteTvShow(+req.params.id)
      if (deletedTvShow instanceof TvShow) {
        return res.status(200).json(deletedTvShow)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
