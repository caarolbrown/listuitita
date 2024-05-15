import TvShow from "./tvShow.model";

export default interface TvShowServiceInterface {
  getTvShows(page: number, limit: number): TvShow[]
  createTvShow(newTvShow: TvShow): TvShow 
  getTvShow(id: number): TvShow
  updateTvShow(updatedTvShow: TvShow): TvShow
  deleteTvShow(id: number): TvShow
}
