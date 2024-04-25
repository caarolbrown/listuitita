import { Request, Response } from "express"
import { MovieServiceMock } from "../services/movie.service.mock"
import MovieServiceInterface from "../services/movie.service.interface"
import Movie from "../models/movie"

export class MovieController {
  public static async getMovies(_req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const movies = movieService.getMovies()
      return res.status(201).json(movies)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let newMovie: Movie | undefined = new Movie(
        -1,
        req.body.title
      )
      newMovie = movieService.createMovie(newMovie)
      if (newMovie instanceof Movie) {
        return res.status(201).json(newMovie)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      const movie = movieService.getMovie(+req.params.id)
      return res.status(201).json(movie)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let updatedMovie: Movie | undefined = new Movie(
        +req.params.id,
        req.body.title
      )
      updatedMovie = movieService.updateMovie(updatedMovie)
      if (updatedMovie instanceof Movie) {
        return res.status(201).json(updatedMovie)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteMovie(req: Request, res: Response) {
    try {
      const movieService: MovieServiceInterface = new MovieServiceMock()
      let deletedMovie: Movie | undefined = new Movie(
        +req.params.id,
        req.body.title
      )
      deletedMovie = movieService.deleteMovie(+req.params.id)
      if (deletedMovie instanceof Movie) {
        return res.status(201).json(deletedMovie)
      } else {
        return res.status(400).json({ message: "Bad request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
