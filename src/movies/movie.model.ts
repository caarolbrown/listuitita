class Movie {
  id: number
  title: string
  genre: string
  deleted: boolean = false

  constructor(id: number, title: string, genre: string) {
    this.id = id
    this.title = title
    this.genre = genre
  }
}

export default Movie
