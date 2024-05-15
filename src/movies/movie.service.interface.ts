import { MovieFilterBy } from "../models/filter";
import { SortBy } from "../models/sort";
import Movie from "./movie.model";

export default interface MovieServiceInterface {
    getMovies(page: number, limit: number, filterBy: MovieFilterBy, sortBy: SortBy): Movie[]
    createMovie(newMovie: Movie): Movie
    getMovie(id: number): Movie
    updateMovie(updatedMovie: Movie): Movie
    deleteMovie(id: number): Movie 
}
