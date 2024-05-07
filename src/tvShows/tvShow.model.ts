class TvShow {
  id: number
  title: string
  deleted: boolean = false

  constructor(id: number, title: string) {
    this.id = id
    this.title = title
  }
}

export default TvShow
