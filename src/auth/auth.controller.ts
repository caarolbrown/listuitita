import { Request, Response } from "express"
import HttpCode from "../httpCode/httpCode.model";
import { AuthServiceDB } from "./auth.service.db";
import AuthServiceInterface from "./auth.service.interface";

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const authService: AuthServiceInterface = new AuthServiceDB()
      const email = req.body.email
      const password = req.body.password
      const session = await authService.login(email, password)
      return res.status(HttpCode.Created).json(session)
    } catch (error) {
      return res.status(HttpCode.InternalServerError).send(error.message)
    }
  }
}