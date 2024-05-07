import List from "./list.model";
import Movie from "../movies/movie.model";
import TvShow from "../tvShows/tvShow.model";
import ListServiceInterface from "./list.service.interface";

export class ListServiceMock implements ListServiceInterface {

  lists: List[]

  constructor() {
    this.lists = []
    let movies: Movie[] = []
    movies.push(new Movie(
      1,
      "Peli 1"
    ))
    let tvShow: TvShow[] = []
    tvShow.push(new TvShow(
      1,
      "TvShow 1"
    ))
    this.lists.push(new List(
      1,
      1,
      "Lista 1",
      movies,
      tvShow
    ))
  }

  getLists(): List[] {
    return this.lists
  }

  createList(newList: List): List | undefined {
    for (const list of this.lists) {
      if (list.title === newList.title) {
        return undefined
      }
    }

    this.lists.push(newList)
    this.lists[this.lists.length - 1].id = this.lists.length
    return this.lists[this.lists.length - 1]
  }

  getList(id: number): List | undefined {
    for (const list of this.lists) {
      if (list.id === id) return list
    }
    return undefined
  }

  updateList(updatedList: List): List | undefined {
    for (const list of this.lists) {
      if (updatedList.id === list.id) {
        return updatedList
      }
    }
    return undefined
  }

  deleteList(id: number): List | undefined {
    for (const list of this.lists) {
      if (list.id === id) {
        list.deleted = true 
        return list
      }
    }
    return undefined
  }
}
