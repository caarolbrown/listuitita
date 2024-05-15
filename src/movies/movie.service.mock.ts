import { AppError } from "../error/error"
import HttpCode from "../httpCode/httpCode.model"
import { FilterBy } from "../models/filter"
import Movie from "./movie.model"
import MovieServiceInterface from "./movie.service.interface"

export class MovieServiceMock implements MovieServiceInterface {

  movies: Movie[]

  constructor() {
    this.movies = []
    this.movies.push(new Movie(
      1,
      "la sirenita"
    ))
    this.movies.push(new Movie(
      2,
      "cadena perpetua"
    ))
    this.movies.push(new Movie(
      3,
      "ironman"
    ))
    this.movies.push(new Movie(
      4,
      "mulan"
    ))
    this.movies.push(new Movie(
      5,
      "aladin"
    ))
    this.movies.push(new Movie(
      6,
      "rey leon"
    ))
  }

  getMovies(page: number, limit: number, filterBy: FilterBy): Movie[] {
    let filteredMovies: Movie[] = this.movies
    if (filterBy.name) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.title.includes(String(filterBy.name))
      })
    }
    return filteredMovies.slice(page * limit, (page * limit) + limit)
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
