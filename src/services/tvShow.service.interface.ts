import TvShow from "../models/tvShow";

export default interface TvShowServiceInterface {
  getTvShows(): TvShow[]
  createTvShow(newTvShow: TvShow): TvShow | undefined
  getTvShow(id: number): TvShow | undefined
  updateTvShow(updatedTvShow: TvShow): TvShow | undefined
  deleteTvShow(id: number): TvShow | undefined
}
