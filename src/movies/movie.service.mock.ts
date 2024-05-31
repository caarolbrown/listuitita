import { AppError } from "../error/error"
import HttpCode from "../httpCode/httpCode.model"
import { MovieFilterBy } from "../models/filter"
import { SortBy } from "../models/sort"
import Movie from "./movie.model"
import MovieServiceInterface from "./movie.service.interface"

export class MovieServiceMock implements MovieServiceInterface {

  movies: Movie[]

  constructor() {
    this.movies = []
    this.movies.push(new Movie(
      1,
      "la sirenita",
      "animation",
      7,
      false
    ))
    this.movies.push(new Movie(
      2,
      "cadena perpetua",
      "sad",
      10,
      false
    ))
    this.movies.push(new Movie(
      3,
      "ironman",
      "action",
      4,
      false
    ))
    this.movies.push(new Movie(
      4,
      "mulan",
      "animation",
      5,
      false
    ))
    this.movies.push(new Movie(
      5,
      "aladin",
      "animation",
      6,
      false

    ))
    this.movies.push(new Movie(
      6,
      "rey leon",
      "animation",
      2,
      false
    ))
  }

  async getMovies(page: number, limit: number, filterBy: MovieFilterBy, sortBy: SortBy): Promise<Movie[]> {
    let filteredMovies: Movie[] = this.movies
    if (filterBy.title) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.title.includes(String(filterBy.title))
      })
    }
    if (filterBy.genre) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.genre === filterBy.genre
      })
    }
    if (sortBy.score) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        if(movieA.score < movieB.score) {
          return 1
        }
        if (movieA.score > movieB.score) {
          return -1
        }
        return 0
      })
    }

    return filteredMovies.slice(page * limit, (page * limit) + limit)
  }

  async createMovie(newMovie: Movie): Promise<Movie> {
    for (const movie of this.movies) {
      if (movie.title === newMovie.title) {
        throw new AppError('Movie already exists', HttpCode.BadRequest, `Movie with this title: ${newMovie.title} already exists`)
      }
    }

    this.movies.push(newMovie)
    this.movies[this.movies.length - 1].id = this.movies.length
    return this.movies[this.movies.length - 1]
  }

  async getMovie(id: number): Promise<Movie> {
    for (const movie of this.movies) {
      if (movie.id === id)
        return movie
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this id: ${id} was not found`)
  }

  async updateMovie(updatedMovie: Movie): Promise<Movie> {
    for (const movie of this.movies) {
      if (updatedMovie.id === movie.id) {
        return updatedMovie
      }
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this ${updatedMovie.id} was not found`)
  }

  async deleteMovie(id: number): Promise<Movie> {
    for (const movie of this.movies) {
      if (movie.id === id) {
        movie.deleted = true
        return movie
      }
    }
    throw new AppError('Movie not found', HttpCode.NotFound, `Movie with this ${id} was not found`)
  }
}
