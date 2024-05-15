class Movie {
  id: number
  title: string
  genre: string
  score: number
  deleted: boolean = false

  constructor(id: number, title: string, genre: string, score: number) {
    this.id = id
    this.title = title
    this.genre = genre
    this.score = score
  }
}

export default Movie
