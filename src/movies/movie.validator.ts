import { Request, Response, NextFunction } from "express";
import HttpCode from "../httpCode/httpCode.model";

function movieValidateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body
  const title = body.title 
  if (title === null || title == undefined){
    return res.status(HttpCode.BadRequest).send("The title is missing")
  }
  if (!(typeof title === "string" || title instanceof String)){
    return res.status(HttpCode.BadRequest).send("This title format is not supported")
  }
  return next()
}

export default movieValidateBody
