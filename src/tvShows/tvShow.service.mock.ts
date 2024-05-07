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
    }

  getTvShows(): TvShow[] {
    return this.tvShows
  }

  createTvShow(newTvShow: TvShow): TvShow | undefined {
    for (const tvShow of this.tvShows) {
      if (tvShow.title === newTvShow.title) {
        return undefined
      }
    }

    this.tvShows.push(newTvShow)
    this.tvShows[this.tvShows.length -1].id = this.tvShows.length
    return this.tvShows[this.tvShows.length -1]
  }

  getTvShow(id: number): TvShow | undefined {
    for (const tvShow of this.tvShows) {
      if (tvShow.id === id) {
        return tvShow
      }
    }
    return undefined
  }

  updateTvShow(updatedTvShow: TvShow): TvShow | undefined {
    for (const tvShow of this.tvShows) {
      if (updatedTvShow.id === tvShow.id) {
        return updatedTvShow
      }
    }
    return undefined
  }

  deleteTvShow(id: number): TvShow | undefined {
    for (const tvShow of this.tvShows) {
      if (tvShow.id === id) {
        tvShow.deleted = true
        return tvShow
      }
    }
    return undefined
  }

  generateNewTvShow(): number {
    return 1
  }
}
