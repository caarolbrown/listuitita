import { Request, Response } from "express"
import TvShowServiceInterface from "./tvShow.service.interface"
//import { TvShowServiceMock } from "./tvShow.service.mock"
import TvShow from "./tvShow.model"
import HttpCode from "../httpCode/httpCode.model"
import { AppError } from "../error/error"
import { FilterBy } from "../models/filter"
import { TvShowServiceDB } from "./tvShow.service.db"

export class TvShowController {
  public static async getTvShows(req: Request, res: Response){
    const DEFAULT_TVSHOW_PAGE = 0
    const DEFAULT_TVSHOW_LIMIT= 3
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      const title: string | undefined = req.query.title ? String(req.query.title) : undefined
      const page: number = req.query.page ? Number(req.query.page) : DEFAULT_TVSHOW_PAGE
      const limit: number = req.query.limit ? Number(req.query.limit) : DEFAULT_TVSHOW_LIMIT
      const tvShows = await tvShowService.getTvShows(page, limit, new FilterBy(title))
      return res.status(HttpCode.Ok).json(tvShows)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async createTvShow(req: Request, res: Response){
    try {
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      let newTvShow: TvShow = new TvShow(
        -1, 
        req.body.title,
        false
      )
      newTvShow = await tvShowService.createTvShow(newTvShow)
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
    const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
    const tvShow = await tvShowService.getTvShow(+req.params.id)
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
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      let updatedTvShow: TvShow = new TvShow (
        +req.params.id,
        req.body.title,
        req.body.deleted
      )
      updatedTvShow = await tvShowService.updateTvShow(updatedTvShow)
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
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      let deletedTvShow: TvShow = new TvShow(
        +req.params.id,
        req.body.title,
        req.body.deleted
      )
      deletedTvShow = await tvShowService.deleteTvShow(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedTvShow)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
