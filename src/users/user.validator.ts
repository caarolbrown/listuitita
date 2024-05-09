import { Request, Response, NextFunction } from "express"
import HttpCode from "../httpCode/httpCode.model"

function userValidateBody(req: Request, res: Response, next: NextFunction) {
  const body = req.body
  const email = body.email
  const password = body.password
  if (email === null || email === undefined) {
    return res.status(HttpCode.BadRequest).send("Email is missing")
  }
  if (password === null || password === undefined) {
    return res.status(HttpCode.BadRequest).send("Password is missing")
  }
  if (!email.includes("@")){
    return res.status(HttpCode.BadRequest).send("The email format is not supported")
  }
  return next()
}

export default userValidateBody
