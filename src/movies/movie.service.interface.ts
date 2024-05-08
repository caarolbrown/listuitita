import Movie from "./movie.model";

export default interface MovieServiceInterface {
    getMovies(): Movie[]
    createMovie(newMovie: Movie): Movie
    getMovie(id: number): Movie
    updateMovie(updatedMovie: Movie): Movie
    deleteMovie(id: number): Movie 
}
