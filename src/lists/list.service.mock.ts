import List from "./list.model";
import Movie from "../movies/movie.model";
import TvShow from "../tvShows/tvShow.model";
import ListServiceInterface from "./list.service.interface";
import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { FilterBy } from "../models/filter";

export class ListServiceMock implements ListServiceInterface {

  lists: List[]

  constructor() {
    this.lists = []
    let movies: Movie[] = []
    movies.push(new Movie(
      1,
      "Peli 1",
      "animation"
    ))
    let tvShows: TvShow[] = []
    tvShows.push(new TvShow(
      1,
      "TvShow 1"
    ))
    this.lists.push(new List(
      1,
      1,
      "Lista1",
      movies,
      tvShows
    ))
    this.lists.push(new List(
      2,
      1,
      "Lista2",
      movies,
      tvShows
    ))
    this.lists.push(new List(
      3,
      1,
      "Lista3",
      movies,
      tvShows
    ))
  }

  getLists(page: number, limit: number, filterBy: FilterBy): List[] {
    let filteredList: List[] = this.lists
    if(filterBy.title) {
      filteredList = filteredList.filter(list => {
        return list.title.includes(String(filterBy.title))
      })
    }
    return filteredList.slice(page * limit, (page * limit) + limit)
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
