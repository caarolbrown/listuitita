import { Request, Response } from "express";
//import { ListServiceMock } from "./list.service.mock";
//import { MovieServiceMock } from "../movies/movie.service.mock";
//import { TvShowServiceMock } from "../tvShows/tvShow.service.mock";
import ListServiceInterface from "./list.service.interface";
import List from "./list.model";
import MovieServiceInterface from "../movies/movie.service.interface";
import Movie from "../movies/movie.model";
import HttpCode from "../httpCode/httpCode.model";
import { AppError } from "../error/error";
import TvShowServiceInterface from "../tvShows/tvShow.service.interface";
import TvShow from "../tvShows/tvShow.model";
import { FilterBy } from "../models/filter";
import { TvShowServiceDB } from "../tvShows/tvShow.service.db";
import { MovieServiceDB } from "../movies/movie.service.db";
import { ListServiceDB } from "./list.service.db";

export class ListController {
  public static async getLists(req: Request, res: Response) {
    const DEFAULT_LIST_PAGE = 0
    const DEFAULT_LIST_LIMIT = 3
    try {
      const listService: ListServiceInterface = new ListServiceDB()
      const title: string | undefined = req.query.title ? String(req.query.title) : undefined
      const page: number = req.query.page ? Number(req.query.page) : DEFAULT_LIST_PAGE
      const limit: number = req.query.limit ? Number(req.query.limit) : DEFAULT_LIST_LIMIT
      const lists = await listService.getLists(page, limit, new FilterBy(title))
      return res.status(HttpCode.Ok).json(lists)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.BadRequest).send(error.message)
    }
  }

  public static async createList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceDB()
      const movieService: MovieServiceInterface = new MovieServiceDB()
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      const movieIds: number[] = req.body.movie_ids
      const tvShowIds: number[] = req.body.tvShow_ids
      const movies: Movie[] = []
      const tvShows: TvShow[] = []
      if (movieIds !== null && movieIds !== undefined) {
        for (const movieId of movieIds) {
          const movie = await movieService.getMovie(movieId)
          movies.push(movie)
        }
      }
      if (tvShowIds !== null && movieIds !== undefined) {
        for (const tvShowId of tvShowIds) {
          const tvShow = await tvShowService.getTvShow(tvShowId)
          tvShows.push(tvShow)
        }
      }
      let newList: List = new List(
        -1,
        req.body.id_user,
        req.body.title,
        req.body.movies,
        req.body.tvShows,
        false
      )
      newList = await listService.createList(newList)
      return res.status(HttpCode.Ok).json(newList)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async getList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceDB()
      const list = await listService.getList(+req.params.id)
      return res.status(HttpCode.Ok).json(list)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async updateList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceDB()
      const movieService: MovieServiceInterface = new MovieServiceDB()
      const tvShowService: TvShowServiceInterface = new TvShowServiceDB()
      const movieIds: number[] = req.body.movie_ids
      const tvShowIds: number[] = req.body.tvShow_ids
      const movies: Movie[] = []
      const tvShows: TvShow[] = []
      if (movieIds !== null && movieIds !== undefined) {
        for (const movieId of movieIds) {
          const movie = await movieService.getMovie(movieId)
          movies.push(movie)
        }
      }
      if (tvShowIds !== null && tvShowIds !== undefined) {
        for (const tvShowId of tvShowIds) {
          const tvShow = await tvShowService.getTvShow(tvShowId)
          tvShows.push(tvShow)
        }
      }
      let updatedList: List = new List(
        +req.params.id,
        req.body.id_user,
        req.body.title,
        req.body.movies,
        req.body.tvShows,
        false
      )
      updatedList = await listService.updateList(updatedList)
      return res.status(HttpCode.Ok).json(updatedList)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async deleteList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceDB()
      let deletedList: List = new List(
        +req.params.id,
        req.body.id_user,
        req.body.title,
        req.body.movies,
        req.body.tvShows,
        false
      )
      deletedList = await listService.deleteList(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedList)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async addMoviesToList(req: Request, res: Response) {
    try {
      const listService: ListServiceDB = new ListServiceDB()
      const movieIds: number[] = req.body.movie_ids
      const movieAdded = await listService.addMoviesToList(+req.params.id, movieIds)
      return res.status(HttpCode.Ok).json(movieAdded)
    } catch (error) {
      return res.status(HttpCode.BadRequest).send(error.message)
    }
  }

  public static async addTvShowToList(req: Request, res: Response) {
    try {
      const listService: ListServiceDB = new ListServiceDB()
      const tvShowIds: number[] = req.body.tvShow_ids
      const tvShowAdded = await listService.addTvShowToList(+req.params.id, tvShowIds)
      return res.status(HttpCode.Ok).json(tvShowAdded)
    } catch (error) {
      return res.status(HttpCode.BadRequest).json(error.message)
    }
  }
}
