import { Request, Response } from "express";
import { ListServiceMock } from "./list.service.mock";
import ListServiceInterface from "./list.service.interface";
import List from "./list.model";
import MovieServiceInterface from "../movies/movie.service.interface";
import { MovieServiceMock } from "../movies/movie.service.mock";
import Movie from "../movies/movie.model";
import HttpCode from "../httpCode/httpCode.model";
import { AppError } from "../error/error";
import { TvShowServiceMock } from "../tvShows/tvShow.service.mock";
import TvShowServiceInterface from "../tvShows/tvShow.service.interface";
import TvShow from "../tvShows/tvShow.model";
import { FilterBy } from "../models/filter";

export class ListController {
  public static async getLists(req: Request, res: Response) {
    const DEFAULT_LIST_PAGE = 0
    const DEFAULT_LIST_LIMIT = 3
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      const title: string | undefined = req.query.title ? String(req.query.title) : undefined
      const page: number = req.query.page ? Number(req.query.page) : DEFAULT_LIST_PAGE
      const limit: number = req.query.limit ? Number(req.query.limit) : DEFAULT_LIST_LIMIT
      const lists = listService.getLists(page, limit, new FilterBy(title))
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
      const listService: ListServiceInterface = new ListServiceMock()
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      const movieIds: number[] = req.body.movie_ids
      const tvShowIds: number[] = req.body.tvShow_ids
      const movies: Movie[] = []
      const tvShows: TvShow[] = []
      if (movieIds !== null && movieIds !== undefined) {
        for (const movieId of movieIds) {
          const movie = movieService.getMovie(movieId)
          movies.push(movie)
        }
      }
      if (tvShowIds !== null && movieIds !== undefined) {
        for (const tvShowId of tvShowIds) {
          const tvShow = tvShowService.getTvShow(tvShowId)
          tvShows.push(tvShow)
        }
      }
      let newList: List = new List(
        -1,
        req.body.userId,
        req.body.title,
        movies,
        tvShows
      )
      newList = listService.createList(newList)
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
      const listService: ListServiceInterface = new ListServiceMock()
      const list = listService.getList(+req.params.id)
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
      const listService: ListServiceInterface = new ListServiceMock()
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const tvShowService: TvShowServiceInterface = new TvShowServiceMock()
      const movieIds: number[] = req.body.movie_ids
      const tvShowIds: number[] = req.body.tvShow_ids
      const movies: Movie[] = []
      const tvShows: TvShow[] = []
      if (movieIds !== null && movieIds !== undefined) {
        for (const movieId of movieIds) {
          const movie = movieService.getMovie(movieId)
          movies.push(movie)
        }
      }
      if (tvShowIds !== null && tvShowIds !== undefined) {
        for (const tvShowId of tvShowIds) {
          const tvShow = tvShowService.getTvShow(tvShowId)
          tvShows.push(tvShow)
        }
      }
      let updatedList: List = new List(
        +req.params.id,
        req.body.userId,
        req.body.title,
        movies,
        tvShows
      )
      updatedList = listService.updateList(updatedList)
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
      const listService: ListServiceInterface = new ListServiceMock()
      let deletedList: List = new List(
        +req.params.id,
        req.body.userId,
        req.body.title,
        req.body.movies,
        req.body.tvShows
      )
      deletedList = listService.deleteList(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedList)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
