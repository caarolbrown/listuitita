class TvShow {
  id: number
  title: string
  deleted: boolean = false

  constructor(id: number, title: string, deleted: boolean) {
    this.id = id
    this.title = title
    this.deleted = deleted
  }
}

export default TvShow
