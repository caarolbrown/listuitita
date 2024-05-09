import { Request, Response, NextFunction } from "express";
import HttpCode from "../httpCode/httpCode.model";

function listValidateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body
  const userId = body.userId
  const title = body.title
  const movieIds = body.movie_ids
  const tvShowIds = body.tvShow_ids

  if (userId === null || userId === undefined){
    return res.status(HttpCode.BadRequest).send("UserId is missing")
  }
  if (title === null || title === undefined) {
    return res.status(HttpCode.BadRequest).send("Title is missing")
  }
  if (!(typeof title === "string" || title instanceof String)) {
    return res.status(HttpCode.BadRequest).send("The title format is not supported")
  }
  if (movieIds !== null && movieIds !== undefined && (!Array.isArray(movieIds) || movieIds.some(id => typeof id !== 'number'))) {
    return res.status(HttpCode.BadRequest).send("The movieIds format is not supported")
  }
  if (tvShowIds !== null && tvShowIds !== undefined && (!Array.isArray(tvShowIds) || tvShowIds.some(id => typeof id !== 'number'))) {
    return res.status(HttpCode.BadRequest).send("The tvShowsIds format is not supported")
  }
  return next()
}

export default listValidateBody
