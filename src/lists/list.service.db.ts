import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { FilterBy } from "../models/filter";
import Movie from "../movies/movie.model";
import TvShow from "../tvShows/tvShow.model";
import List from "./list.model";
import ListServiceInterface from "./list.service.interface";
import { connect } from "ts-postgres";

export class ListServiceDB implements ListServiceInterface {
  async getLists(page: number, limit: number, filterBy: FilterBy): Promise<List[]> {
    try {
      const client = await this.connectDB()
      let sqlSelect = "SELECT id, id_user, title, deleted FROM lists"
      let sqlParams = []
      if (filterBy.title) {
        sqlSelect += " WHERE title LIKE $" + (sqlParams.length + 1)
        sqlParams.push(filterBy.title)
      }
      sqlSelect += " LIMIT $" + (sqlParams.length + 1) + " OFFSET $" + (sqlParams.length + 2)
      sqlParams.push(limit, (limit * page - 1))
      const result = await client.query(
        sqlSelect, sqlParams
      )
      const lists: List[] = []
      for (const row of result.rows) {
        lists.push(new List(
          row.get('id'),
          row.get('id_user'),
          row.get('title'),
          row.get('movies'),
          row.get('tvShows'),
          row.get('deleted')
        ))
      }
      return lists
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async createList(newList: List): Promise<List> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "INSERT INTO lists(id_user, title, deleted) VALUES ($1, $2, $3) RETURNING id", [newList.id_user, newList.title, newList.deleted]
      )
      const list: List = new List(
        result.rows[0].get('id'),
        newList.id_user,
        newList.title,
        [],
        [],
        false
      )
      return list
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async getList(id: number): Promise<List> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT\
        lists.id as id_list,\
        id_user,\
        lists.title as list_title,\
        lists.deleted as list_deleted,\
        id_movie,\
        id_tvshow,\
        movies.title as movie_title,\
        tvshows.title as tvshow_title,\
        tvshows.deleted as tvshow_deleted,\
        movies.score as movie_score,\
        tvshows.score as tvshow_score,\
        movies.deleted as movie_deleted,\
        genre\
        FROM lists\
        LEFT JOIN lists_movies ON lists.id = lists_movies.id_list\
        LEFT JOIN movies ON movies.id = lists_movies.id_movie\
        LEFT JOIN lists_tvshows ON lists.id = lists_tvshows.id_list\
        LEFT JOIN tvshows ON tvshows.id = lists_tvshows.id_tvshow\
        WHERE lists.id = $1", [id]
      )
      const movies: Movie[] = []
      for (const row of result.rows) {
        if (row.get('id_movie')) {
          movies.push(new Movie(
            row.get('id_movie'),
            row.get('movie_title'),
            row.get('genre'),
            row.get('movie_score'),
            row.get('movie_deleted')
          ))
        }
      }
      const tvShows: TvShow[] = []
      for (const row of result.rows) {
        if (row.get('id')) {
          tvShows.push(new TvShow(
            row.get('id'),
            row.get('title'),
            row.get('tvshow_score'),
            row.get('tvshow_deleted')
          ))
        }
      }
      const list: List = new List(
        result.rows[0].get('id_list'),
        result.rows[0].get('id_user'),
        result.rows[0].get('list_title'),
        movies,
        [],
        result.rows[0].get('list_deleted')
      )
      return list
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }

  }
  async updateList(updatedList: List): Promise<List> {
    try {
      const client = await this.connectDB()
      await client.query(
        "UPDATE lists SET id_user = $1, title = $2, deleted = $3 WHERE id= $4",
        [updatedList.id_user, updatedList.title, updatedList.deleted, updatedList.id]
      )
      return updatedList
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }
  async deleteList(id: number): Promise<List> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "UPDATE lists SET deleted = true WHERE id = $1 RETURNING id, id_user, title, deleted", [id]
      )
      const list: List = new List(
        result.rows[0].get('id'),
        result.rows[0].get('id_user'),
        result.rows[0].get('title'),
        result.rows[0].get('movies'),
        result.rows[0].get('tvShows'),
        false
      )
      return list
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message);
    }
  }

  async addMoviesToList(idList: number, movieIds: number[]) {
    try {
      const client = await this.connectDB()
      for (const movieId of movieIds) {
        await client.query(
          "INSERT INTO lists_movies(id_list, id_movie) VALUES ($1, $2)", [idList, movieId]
        )
      }
      if (movieIds.length === 1) {
        return (`This movieId ${movieIds} has been added to this list: ${idList}`)
      } else {
        return (`These movieIds ${movieIds} have been added to this list: ${idList}`)
      }
    } catch (error) {
      throw new AppError(error.message, HttpCode.InternalServerError, error.message)
    }
  }

  async addTvShowToList(idList: number, tvShows: number[]) {
    try {
      const client = await this.connectDB()
      for (const tvShow of tvShows) {
        await client.query(
          "INSERT INTO lists_tvshows(id_list, id_tvshow) VALUES ($1, $2)", [idList, tvShow]
        )
      }
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