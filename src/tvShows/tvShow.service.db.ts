import { FilterBy } from "../models/filter";
import TvShow from "./tvShow.model";
import TvShowServiceInterface from "./tvShow.service.interface";
import { connect } from "ts-postgres";

export class TvShowServiceDB implements TvShowServiceInterface {
  async getTvShows(_page: number, _limit: number, _filterBy: FilterBy): Promise<TvShow[]> {
    const client = await this.connectDB()
    const result = await client.query(
      "SELECT * FROM tvShows"
    )
    const tvShow: TvShow[] = []
    for (const row of result.rows) {
      tvShow.push(new TvShow(
        row.get('id'),
        row.get('title'),
        row.get('deleted')
      ))
    }
    return tvShow
  }

  async createTvShow(newTvShow: TvShow): Promise<TvShow> {
    const client = await this.connectDB()
    const result = await client.query(
      "INSERT INTO tvShows (title) VALUES ($1) RETURNING id", [newTvShow.title]
    )
    const tvShow: TvShow = new TvShow(
      result.rows[0].get('id'),
      newTvShow.title,
      newTvShow.deleted
    )
    return tvShow
  }

  async getTvShow(id: number): Promise<TvShow> {
    const client = await this.connectDB()
    const result = await client.query(
      "SELECT * FROM tvShows WHERE id = $1", [id]
    )
    let tvShow: TvShow = new TvShow(
      result.rows[0].get('id'),
      result.rows[0].get('title'),
      result.rows[0].get('deleted')
    )
    return tvShow
  }

  async updateTvShow(updatedTvShow: TvShow): Promise<TvShow> {
    const client = await this.connectDB()
    await client.query(
      "UPDATE tvShows SET title = $1, deleted = $2", [updatedTvShow.title, updatedTvShow.deleted]
    )
    const result = await client.query(
      "SELECT * FROM tvShow WHERE id = $1", [updatedTvShow.id]
    )
    const tvShow: TvShow = new TvShow(
      result.rows[0].get('id'),
      result.rows[0].get('title'),
      result.rows[0].get('deleted')
    )
    return tvShow
  }

  async deleteTvShow(id: number): Promise<TvShow> {
    const client = await this.connectDB()
    const result = await client.query(
      "UPDATE tvShows SET deleted = true WHERE id = $1 RETURNING id, title, deleted", [id]
    )
    const tvShow: TvShow = new TvShow(
      result.rows[0].get('id'),
      result.rows[0].get('title'),
      result.rows[0].get('deleted'),
    )
    return tvShow
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