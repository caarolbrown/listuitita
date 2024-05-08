import HttpCode from "../httpCode/httpCode.model"

// centralized error object that derives from Node’s Error
export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode

  constructor(name: string, httpCode: HttpCode, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name
    this.httpCode = httpCode

    Error.captureStackTrace(this)
  }
}
