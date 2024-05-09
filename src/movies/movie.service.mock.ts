import { AppError } from "../error/error"
import HttpCode from "../httpCode/httpCode.model"
import Movie from "./movie.model"
import MovieServiceInterface from "./movie.service.interface"

export class MovieServiceMock implements MovieServiceInterface {

  movies: Movie[]

  constructor() {
    this.movies = []
    this.movies.push(new Movie(
      1,
      "La sirenita"
    ))
    this.movies.push(new Movie(
      2,
      "Cadena perpetua"
    ))
  }

  getMovies(): Movie[] {
    return this.movies
  }

  createMovie(newMovie: Movie): Movie {
    for (const movie of this.movies) {
      if (movie.title === newMovie.title) {
        throw new AppError('Movie already exists', HttpCode.BadRequest, `Movie with this title: ${newMovie.title} already exists`)
      }
    }

    this.movies.push(newMovie)
    this.movies[this.movies.length - 1].id = this.movies.length
    return this.movies[this.movies.length - 1]
  }

  getMovie(id: number): Movie {
    for (const movie of this.movies) {
      if (movie.id === id)
        return movie
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this id: ${id} was not found`)
  }

  updateMovie(updatedMovie: Movie): Movie {
    for (const movie of this.movies) {
      if (updatedMovie.id === movie.id) {
        return updatedMovie
      }
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this ${updatedMovie.id} was not found`)
  }

  deleteMovie(id: number): Movie {
    for (const movie of this.movies) {
      if (movie.id === id) {
        movie.deleted = true
        return movie
      }
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this ${id} was not found`)
  }
}
