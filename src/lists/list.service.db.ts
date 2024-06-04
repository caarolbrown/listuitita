import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import { FilterBy } from "../models/filter";
import List from "./list.model";
import ListServiceInterface from "./list.service.interface";
import { connect } from "ts-postgres";

export class ListServiceDB implements ListServiceInterface {
  async getLists(_page: number, _limit: number, _filterBy: FilterBy): Promise<List[]> {
    try {
      const client = await this.connectDB()
      const result = await client.query(
        "SELECT id, id_user, title, deleted FROM lists"
      )
      const lists: List[] = []
      for (const row of result.rows) {
        lists.push(new List(
          row.get('id'),
          row.get('id_user'),
          row.get('title'),
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
        "SELECT * FROM lists WHERE id = $1", [id]
      )
      const list: List = new List(
        result.rows[0].get('id'),
        result.rows[0].get('id_user'),
        result.rows[0].get('title'),
        false
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
        result.rows[0].get('deleted')
      )
      return list
    } catch (error) {
      throw new AppError(error.message, HttpCode.BadRequest, error.message);
    }
  }

  async addMovieToList(idList: number, movie_ids: number[]) {
    try {
      const client = await this.connectDB()
      await client.query(
        "INSERT INTO lists_movies(id_list, id_movie) VALUES ($1, $2)", [idList, movie_ids]
      )
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