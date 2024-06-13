import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { MovieFilterBy } from "../models/filter";
import { SortBy } from "../models/sort";
import Movie from "./movie.model";
import MovieServiceInterface from "./movie.service.interface";
import { connect } from "ts-postgres";

export class MovieServiceDB implements MovieServiceInterface {
  async getMovies(page: number, limit: number, filterBy: MovieFilterBy, sortBy: SortBy): Promise<Movie[]> {
    try {
      const client = await this.connectDB()
      let sqlSelect = "SELECT * FROM movies"
      let sqlParams = []
      if (filterBy.title) {
        sqlSelect += " WHERE title LIKE $" + (sqlParams.length + 1)
        sqlParams.push(`%${filterBy.title}%`)
      }
      if (filterBy.genre) {
        if (sqlSelect.includes("WHERE")) {
          sqlSelect += " AND genre = $" + (sqlParams.length + 1) + " AND genre IS NOT NULL"
        } else {
          sqlSelect += " WHERE genre = $" + (sqlParams.length + 1) + " AND genre IS NOT NULL"
        }
        sqlParams.push(filterBy.genre)
      }
      if (sortBy.score) {
        if (sortBy.orderBy) {
          sqlSelect += " ORDER BY score DESC"
        } else {
          sqlSelect += " ORDER BY score ASC"
        }
      }
      sqlSelect += " LIMIT $" + (sqlParams.length + 1) + " OFFSET $" + (sqlParams.length + 2)
      sqlParams.push(limit, (limit * (page - 1)))
      const result = await client.query(
        sqlSelect, sqlParams
      )
      const movies: Movie[] = []
      for (const row of result.rows) {
        movies.push(new Movie(
          row.get('id'),
          row.get('title'),
          row.get('genre'),
          row.get('score'),
          row.get('deleted')
        ))
      }
      return movies
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async createMovie(newMovie: Movie): Promise<Movie> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "INSERT INTO movies(title, genre, score) VALUES ($1, $2, $3) RETURNING id", [newMovie.title, newMovie.genre.toLocaleLowerCase(), newMovie.score]
      )
      /*const result = await client.query(
        "INSERT INTO movies(title, genre, score) VALUES ('peli1234', 'drama', 9.1) RETURNING id"
      )*/
      const movie: Movie = new Movie(
        result.rows[0].get('id'),
        newMovie.title,
        newMovie.genre,
        newMovie.score,
        false
      )
      return movie
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }
  async getMovie(id: number): Promise<Movie> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT * FROM movies WHERE id = $1", [id]
      )
      let movie: Movie = new Movie(
        result.rows[0].get('id'),
        result.rows[0].get('title'),
        result.rows[0].get('genre'),
        result.rows[0].get('score'),
        result.rows[0].get('deleted')
      )
      return movie
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }
  async updateMovie(updatedMovie: Movie): Promise<Movie> {
    try {
      const client = await this.connectDB()
      await client.query(
        "UPDATE movies SET title = $1, genre = $2, score = $3, deleted = $4", [updatedMovie.title, updatedMovie.genre, updatedMovie.score, updatedMovie.deleted]
      )
      return updatedMovie
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async deleteMovie(id: number): Promise<Movie> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "UPDATE movies SET deleted = true WHERE id = $1 RETURNING id, title, genre, score, deleted", [id]
      )
      const movie: Movie = new Movie(
        result.rows[0].get('id'),
        result.rows[0].get('title'),
        result.rows[0].get('genre'),
        result.rows[0].get('score'),
        result.rows[0].get('deleted')
      )
      return movie
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  private async connectDB() {
    return await connect({
      "host": process.env.DB_HOST,
      "port": Number(process.env.DB_PORT),
      "user": process.env.DB_USER,
      "database": process.env.DB_DATABASE,
      "password": process.env.DB_PASSWORD
    })
  }
}