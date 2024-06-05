import { Request, Response } from "express"
//import { MovieServiceMock } from "./movie.service.mock"
import MovieServiceInterface from "./movie.service.interface"
import Movie from "./movie.model"
import { AppError } from "../error/error"
import HttpCode from "../httpCode/httpCode.model"
import { MovieFilterBy } from "../models/filter"
import { SortBy } from "../models/sort"
import { MovieServiceDB } from "./movie.service.db"

export class MovieController {
  public static async getMovies(req: Request, res: Response) {
    const DEFAULT_MOVIE_PAGE: number = 0
    const DEFAULT_MOVIE_LIMIT: number = 2
    try {
      const movieService: MovieServiceInterface = new MovieServiceDB()
      const title: string | undefined = req.query.title ? String(req.query.title) : undefined
      const genre: string | undefined = req.query.genre ? String(req.query.genre) : undefined
      const score: boolean = req.query.score === 'true' ? true : false 
      const orderBy: boolean = req.query.score === 'true' ? true : false
      //const score: boolean = req.query.score ? Boolean(req.query.score).valueOf() : false
      //const orderBy: boolean = req.query.orderBy ? Boolean(req.query.orderBy).valueOf() : false
      const page: number = req.query.page ? Number(req.query.page) : DEFAULT_MOVIE_PAGE
      const limit: number = req.query.limit ? Number(req.query.limit) : DEFAULT_MOVIE_LIMIT
      const movies = await movieService.getMovies(page, limit, new MovieFilterBy(title, genre), new SortBy(score, orderBy))
      return res.status(HttpCode.Ok).json(movies)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async createMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceDB()
      let newMovie: Movie = new Movie(
        -1,
        req.body.title,
        req.body.genre,
        req.body.score,
        false
      )
      newMovie = await movieService.createMovie(newMovie)
      return res.status(HttpCode.Ok).json(newMovie)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async getMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceDB()
      const movie = await movieService.getMovie(+req.params.id)
      return res.status(HttpCode.Ok).json(movie)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async updateMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceDB()
      let updatedMovie: Movie = new Movie(
        +req.params.id,
        req.body.title,
        req.body.genre,
        req.body.score,
        req.body.deleted
      )
      updatedMovie = await movieService.updateMovie(updatedMovie)
      return res.status(HttpCode.Ok).json(updatedMovie)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }

  public static async deleteMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceDB()
      let deletedMovie: Movie = new Movie(
        +req.params.id,
        req.body.title,
        req.body.genre, 
        req.body.score,
        req.body.deleted
      )
      deletedMovie = await movieService.deleteMovie(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedMovie)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
