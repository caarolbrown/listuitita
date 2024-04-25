import { Request, Response } from "express";
import { ListServiceMock } from "../services/list.service.mock";
import ListServiceInterface from "../services/list.service.interface";
import List from "../models/list";

export class ListController {
  public static async getLists(_req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      const lists = listService.getLists()
      return res.status(201).json(lists)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async createList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      let newList: List | undefined = new List(
        -1,
        req.body.userId,
        req.body.title,
        req.body.movies,
        req.body.tvShows
      )
      newList = listService.createList(newList)
      if (newList instanceof List) {
        return res.status(201).json(newList)
      } else {
        return res.status(400).send({ message: "Bad request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async getList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      const list = listService.getList(+req.params.id)
      return res.status(201).json(list)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async updateList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      let updatedList: List | undefined = new List(
        +req.params.id,
        req.body.userId,
        req.body.title,
        req.body.movies,
        req.body.tvShows
      )
      updatedList = listService.updateList(updatedList)
      if (updatedList instanceof List) {
        return res.status(201).json(updatedList)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  public static async deleteList(req: Request, res: Response) {
    try {
      const listService: ListServiceInterface = new ListServiceMock()
      let deletedList: List | undefined = new List(
        +req.params.id,
        req.body.userId,
        req.body.title,
        req.body.movies,
        req.body.tvShows
      )
      deletedList = listService.deleteList(+req.params.id)
      if (deletedList instanceof List) {
        return res.status(201).json(deletedList)
      } else {
        return res.status(400).json({ message: "Bad Request" })
      }
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
