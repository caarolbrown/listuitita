import { Request, Response } from "express"
import TvShowServiceInterface from "./tvShow.service.interface"
import { TvShowServiceMock } from "./tvShow.service.mock"
import TvShow from "./tvShow.model"
import HttpCode from "../httpCode/httpCode.model"
import { AppError } from "../error/error"

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
      let newTvShow: TvShow = new TvShow(
        -1, 
        req.body.title
      )
      newTvShow = tvShowService.createTvShow(newTvShow)
      return res.status(HttpCode.Ok).json(newTvShow)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async getTvShow(req: Request, res: Response){
    try {
    const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
    const tvShow = tvShowService.getTvShow(+req.params.id)
      return res.status(HttpCode.Ok).json(tvShow)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(HttpCode.NotFound).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async updateTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      let updatedTvShow: TvShow = new TvShow (
        +req.params.id,
        req.body.title
      )
      updatedTvShow = tvShowService.updateTvShow(updatedTvShow)
        return res.status(HttpCode.Ok).json(updatedTvShow)
    } catch (error) {
      if (error instanceof AppError){
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async deleteTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      let deletedTvShow: TvShow = new TvShow(
        +req.params.id,
        req.body.title
      )
      deletedTvShow = tvShowService.deleteTvShow(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedTvShow)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
