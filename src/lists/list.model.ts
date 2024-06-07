import Movie from "../movies/movie.model"
import TvShow from "../tvShows/tvShow.model"

class List {
  id: number
  id_user: number
  title: string
  movies: Movie[] = []
  tvShows: TvShow[] = []
  deleted: boolean = false

  constructor(id: number, id_user: number, title: string, movies: Movie[], tvShows: TvShow[], deleted: boolean) {
    this.id = id
    this.id_user = id_user
    this.title = title
    this.movies = movies
    this.tvShows = tvShows
    this.deleted = deleted
  }
}

export default List
