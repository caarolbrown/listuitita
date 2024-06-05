class TvShow {
  id: number
  title: string
  score: number 
  deleted: boolean = false

  constructor(id: number, title: string, score: number, deleted: boolean) {
    this.id = id
    this.title = title
    this.score = score
    this.deleted = deleted
  }
}

export default TvShow
