import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { FilterBy } from "../models/filter";
import TvShow from "./tvShow.model";
import TvShowServiceInterface from "./tvShow.service.interface";

export class TvShowServiceMock implements TvShowServiceInterface {
    tvShows: TvShow[]

    constructor() {
        this.tvShows = []
        this.tvShows.push(new TvShow(
          1, 
          "Serie 1",
          false
        ))
        this.tvShows.push(new TvShow(
          2, 
          "Serie 2",
          false
        ))
        this.tvShows.push(new TvShow(
          3, 
          "Serie 3",
          false
        ))
        this.tvShows.push(new TvShow(
          4, 
          "Serie 4",
          false
        ))
        this.tvShows.push(new TvShow(
          5, 
          "Serie 5",
          false
        ))
        this.tvShows.push(new TvShow(
          6, 
          "Serie 6",
          false
        ))
    }

  async getTvShows(page: number, limit: number, filterBy: FilterBy): Promise<TvShow[]> {
    let filteredTvShows: TvShow[] = this.tvShows
    if (filterBy.title) {
      filteredTvShows = await filteredTvShows.filter(tvShow => {
        return tvShow.title.includes(String(filterBy.title))
      })
    }
    return filteredTvShows.slice(page * limit, (page * limit) + limit)
  }

  async createTvShow(newTvShow: TvShow): Promise<TvShow> {
    for (const tvShow of this.tvShows) {
      if (tvShow.title === newTvShow.title) {
        throw new AppError('TvShow already exists', HttpCode.BadRequest, `TvShow with this title: ${newTvShow.title} already exists`)
      }
    }

    this.tvShows.push(newTvShow)
    this.tvShows[this.tvShows.length -1].id = this.tvShows.length
    return this.tvShows[this.tvShows.length -1]
  }

  async getTvShow(id: number): Promise<TvShow> {
    for (const tvShow of this.tvShows) {
      if (tvShow.id === id) {
        return tvShow
      }
    }
    throw new AppError('TvShow not found', HttpCode.NotFound, `TvShow with this ${id} was not found`) 
  }

  async updateTvShow(updatedTvShow: TvShow): Promise<TvShow> {
    for (const tvShow of this.tvShows) {
      if (updatedTvShow.id === tvShow.id) {
        return updatedTvShow
      }
    }
    throw new AppError('TvShow not found', HttpCode.NotFound, `TvShow with this ${updatedTvShow.id} was not found`)
  }

  async deleteTvShow(id: number): Promise<TvShow> {
    for (const tvShow of this.tvShows) {
      if (tvShow.id === id) {
        tvShow.deleted = true
        return tvShow
      }
    }
    throw new AppError('TvShow not found', HttpCode.NotFound, `TvShow with this ${id} was not found`)
  }

  generateNewTvShow(): number {
    return 1
  }
}
