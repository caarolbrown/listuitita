import { FilterBy } from "../models/filter";
import Movie from "./movie.model";

export default interface MovieServiceInterface {
    getMovies(page: number, limit: number, filterBy: FilterBy): Movie[]
    createMovie(newMovie: Movie): Movie
    getMovie(id: number): Movie
    updateMovie(updatedMovie: Movie): Movie
    deleteMovie(id: number): Movie 
}
