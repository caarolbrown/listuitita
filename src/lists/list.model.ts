import Movie from "../movies/movie.model"
import TvShow from "../tvShows/tvShow.model"

class List {
  id: number
  userId: number
  title: string
  movie: Movie[]
  tvShow: TvShow[]
  deleted: boolean = false

  constructor(id: number, userId: number, title: string, movie: Movie[], tvShow: TvShow[]) {
    this.id = id
    this.userId = userId
    this.title = title
    this.movie = movie
    this.tvShow = tvShow
  }
}

export default List
