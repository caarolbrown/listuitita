export class FilterBy {
  title: string | undefined

  constructor(title: string | undefined) {
    this.title = title
  }
}

export class MovieFilterBy extends FilterBy {
  genre: string | undefined

  constructor(title: string | undefined, genre: string | undefined) {
    super(title)
    this.genre = genre
  }
}

export class UserFilterBy {
  email: string | undefined

  constructor(email: string | undefined) {
    this.email = email
  }
}

