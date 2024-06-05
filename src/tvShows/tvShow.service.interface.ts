import { FilterBy } from "../models/filter";
import { SortBy } from "../models/sort";
import TvShow from "./tvShow.model";

export default interface TvShowServiceInterface {
  getTvShows(page: number, limit: number, filterBy: FilterBy, sortBy: SortBy): Promise<TvShow[]>
  createTvShow(newTvShow: TvShow): Promise<TvShow> 
  getTvShow(id: number): Promise<TvShow>
  updateTvShow(updatedTvShow: TvShow): Promise<TvShow>
  deleteTvShow(id: number): Promise<TvShow>
}
