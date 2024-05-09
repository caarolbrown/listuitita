import Movie from "../movies/movie.model"
import TvShow from "../tvShows/tvShow.model"

class List {
  id: number
  userId: number
  title: string
  movies: Movie[]
  tvShows: TvShow[]
  deleted: boolean = false

  constructor(id: number, userId: number, title: string, movies: Movie[], tvShows: TvShow[]) {
    this.id = id
    this.userId = userId
    this.title = title
    this.movies = movies
    this.tvShows = tvShows
  }
}

export default List
