import Movie from "../models/movie";

export default interface MovieServiceInterface {
    getMovies(): Movie[]
    createMovie(newMovie: Movie): Movie | undefined
    getMovie(id: number): Movie | undefined
    updateMovie(updatedMovie: Movie): Movie | undefined
    deleteMovie(id: number): Movie | undefined
}
