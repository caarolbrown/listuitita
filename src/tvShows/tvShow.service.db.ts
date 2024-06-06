import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { FilterBy } from "../models/filter";
import { SortBy } from "../models/sort";
import TvShow from "./tvShow.model";
import TvShowServiceInterface from "./tvShow.service.interface";
import { connect } from "ts-postgres";

export class TvShowServiceDB implements TvShowServiceInterface {
  async getTvShows(page: number, limit: number, filterBy: FilterBy, sortBy: SortBy): Promise<TvShow[]> {
    try {
      const client = await this.connectDB()
      let sqlSelect = "SELECT * FROM tvShows"
      let sqlParams = []
      if (filterBy.title) {
        sqlSelect += " WHERE title LIKE $" + (sqlParams.length + 1)
        sqlParams.push(`%${filterBy.title}%`)
      }
      if (sortBy.score) {
        if (sortBy.orderBy) {
          sqlSelect += " ORDER BY score DESC"
        } else {
          sqlSelect += " ORDER BY score ASC"
        }
      }
      sqlSelect += " LIMIT $" + (sqlParams.length + 1) + " OFFSET $" + (sqlParams.length + 2)
      sqlParams.push(limit, (limit * (page -1)))
      const result = await client.query(
        sqlSelect, sqlParams
      )

      const tvShow: TvShow[] = []
      for (const row of result.rows) {
        tvShow.push(new TvShow(
          row.get('id'),
          row.get('title'),
          row.get('score'),
          row.get('deleted')
        ))
      }
      return tvShow
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async createTvShow(newTvShow: TvShow): Promise<TvShow> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "INSERT INTO tvShows (title, score) VALUES ($1, $2) RETURNING id", [newTvShow.title, newTvShow.score]
      )
      const tvShow: TvShow = new TvShow(
        result.rows[0].get('id'),
        newTvShow.title,
        newTvShow.score,
        false
      )
      return tvShow
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async getTvShow(id: number): Promise<TvShow> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT * FROM tvShows WHERE id = $1", [id]
      )
      let tvShow: TvShow = new TvShow(
        result.rows[0].get('id'),
        result.rows[0].get('title'),
        result.rows[0].get('score'),
        result.rows[0].get('deleted')
      )
      return tvShow
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async updateTvShow(updatedTvShow: TvShow): Promise<TvShow> {
    try {
      const client = await this.connectDB()
      await client.query(
        "UPDATE tvShows SET title = $1, deleted = $2::boolean WHERE id = $3", [updatedTvShow.title, updatedTvShow.deleted, updatedTvShow.id]
      )
      return updatedTvShow
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message)
    }
  }

  async deleteTvShow(id: number): Promise<TvShow> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "UPDATE tvShows SET deleted = true WHERE id = $1 RETURNING id, title, deleted", [id]
      )
      const tvShow: TvShow = new TvShow(
        result.rows[0].get('id'),
        result.rows[0].get('title'),
        result.rows[0].get('score'),
        result.rows[0].get('deleted'),
      )
      return tvShow
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