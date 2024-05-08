import List from "./list.model";
import Movie from "../movies/movie.model";
import TvShow from "../tvShows/tvShow.model";
import ListServiceInterface from "./list.service.interface";
import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";

export class ListServiceMock implements ListServiceInterface {

  lists: List[]

  constructor() {
    this.lists = []
    let movies: Movie[] = []
    movies.push(new Movie(
      1,
      "Peli 1"
    ))
    let tvShows: TvShow[] = []
    tvShows.push(new TvShow(
      1,
      "TvShow 1"
    ))
    this.lists.push(new List(
      1,
      1,
      "Lista 1",
      movies,
      tvShows
    ))
  }

  getLists(): List[] {
    return this.lists
  }

  createList(newList: List): List {
    for (const list of this.lists) {
      if (list.title === newList.title) {
        throw new AppError('List already exists', HttpCode.BadRequest, `List with this ${newList.title} already exists`)
      }
    }

    this.lists.push(newList)
    this.lists[this.lists.length - 1].id = this.lists.length
    return this.lists[this.lists.length - 1]
  }

  getList(id: number): List {
    for (const list of this.lists) {
      if (list.id === id) return list
    }
    throw new AppError('List not found', HttpCode.NotFound, `List with this ${id} was not found`)
  }

  updateList(updatedList: List): List {
    for (const list of this.lists) {
      if (updatedList.id === list.id) {
        return updatedList
      }
    }
    throw new AppError('List not found', HttpCode.NotFound, `List with this ${updatedList.id} was not found`)
  }

  deleteList(id: number): List {
    for (const list of this.lists) {
      if (list.id === id) {
        list.deleted = true 
        return list
      }
    }
    throw new AppError('List not found', HttpCode.NotFound, `List with this ${id} was not found`)
  }
}
