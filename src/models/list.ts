import Movie from "./movie"
import TvShow from "./tvShow"

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
