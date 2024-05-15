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
          "Serie 1"
        ))
        this.tvShows.push(new TvShow(
          2, 
          "Serie 2"
        ))
        this.tvShows.push(new TvShow(
          3, 
          "Serie 3"
        ))
        this.tvShows.push(new TvShow(
          4, 
          "Serie 4"
        ))
        this.tvShows.push(new TvShow(
          5, 
          "Serie 5"
        ))
        this.tvShows.push(new TvShow(
          6, 
          "Serie 6"
        ))
    }

  getTvShows(page: number, limit: number, filterBy: FilterBy): TvShow[] {
    let filteredTvShows: TvShow[] = this.tvShows
    if (filterBy.title) {
      filteredTvShows = filteredTvShows.filter(tvShow => {
        return tvShow.title.includes(String(filterBy.title))
      })
    }
    return filteredTvShows.slice(page * limit, (page * limit) + limit)
  }

  createTvShow(newTvShow: TvShow): TvShow {
    for (const tvShow of this.tvShows) {
      if (tvShow.title === newTvShow.title) {
        throw new AppError('TvShow already exists', HttpCode.BadRequest, `TvShow with this title: ${newTvShow.title} already exists`)
      }
    }

    this.tvShows.push(newTvShow)
    this.tvShows[this.tvShows.length -1].id = this.tvShows.length
    return this.tvShows[this.tvShows.length -1]
  }

  getTvShow(id: number): TvShow {
    for (const tvShow of this.tvShows) {
      if (tvShow.id === id) {
        return tvShow
      }
    }
    throw new AppError('TvShow not found', HttpCode.NotFound, `TvShow with this ${id} was not found`) 
  }

  updateTvShow(updatedTvShow: TvShow): TvShow {
    for (const tvShow of this.tvShows) {
      if (updatedTvShow.id === tvShow.id) {
        return updatedTvShow
      }
    }
    throw new AppError('TvShow not found', HttpCode.NotFound, `TvShow with this ${updatedTvShow.id} was not found`)
  }

  deleteTvShow(id: number): TvShow {
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
