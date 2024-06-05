export class SortBy {
  score: boolean = false
  orderBy: boolean = false

  constructor(score: boolean, orderBy: boolean) {
    this.score = score 
    this.orderBy = orderBy
  }
}
