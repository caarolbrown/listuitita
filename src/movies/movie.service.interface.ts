import { MovieFilterBy } from "../models/filter";
import { SortBy } from "../models/sort";
import Movie from "./movie.model";

export default interface MovieServiceInterface {
    getMovies(page: number, limit: number, filterBy: MovieFilterBy, sortBy: SortBy): Promise<Movie[]>
    createMovie(newMovie: Movie): Promise<Movie>
    getMovie(id: number): Promise<Movie>
    updateMovie(updatedMovie: Movie): Promise<Movie>
    deleteMovie(id: number): Promise<Movie> 
}
