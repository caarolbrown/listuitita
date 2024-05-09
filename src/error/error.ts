import HttpCode from "../httpCode/httpCode.model"

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode

  constructor(name: string, httpCode: HttpCode, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode

    Error.captureStackTrace(this)
  }
}
