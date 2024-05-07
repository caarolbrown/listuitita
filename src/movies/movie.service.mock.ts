import Movie from "./movie.model";
import MovieServiceInterface from "./movie.service.interface";

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

  createMovie(newMovie: Movie): Movie | undefined {
    for (const movie of this.movies) {
      if (movie.title == newMovie.title) {
        return undefined
      }
    }

    this.movies.push(newMovie)
    this.movies[this.movies.length - 1].id = this.movies.length
    return this.movies[this.movies.length - 1]
  }

  getMovie(id: number): Movie | undefined {
    for (const movie of this.movies) {
      if (movie.id === id) 
        return movie
    }
    return undefined
  }

  updateMovie(updatedMovie: Movie): Movie | undefined {
    for (const movie of this.movies) {
      if (updatedMovie.id === movie.id) {
        return updatedMovie
      }
    }
    return undefined
  }

  deleteMovie(id: number): Movie | undefined {
    for (const movie of this.movies) {
      if (movie.id === id) {
        movie.deleted = true
        return movie
      }
    }
    return undefined
  }
}
