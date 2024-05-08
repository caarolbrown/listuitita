import { Request, Response } from "express"
import { MovieServiceMock } from "./movie.service.mock"
import MovieServiceInterface from "./movie.service.interface"
import Movie from "./movie.model"
import { AppError } from "../error/error"
import HttpCode from "../httpCode/httpCode.model"

export class MovieController {
  public static async getMovies(_req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const movies = movieService.getMovies()
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let newMovie: Movie = new Movie(
        -1,
        req.body.title
      )
      newMovie = movieService.createMovie(newMovie)
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
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const movie = movieService.getMovie(+req.params.id)
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
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let updatedMovie: Movie = new Movie(
        +req.params.id,
        req.body.title
      )
      updatedMovie = movieService.updateMovie(updatedMovie)
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
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let deletedMovie: Movie = new Movie(
        +req.params.id,
        req.body.title
      )
      deletedMovie = movieService.deleteMovie(+req.params.id)
      return res.status(HttpCode.Ok).json(deletedMovie)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).send(error.message)
      }
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}
