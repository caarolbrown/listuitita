import { AppError } from "../error/error";
import HttpCode from "../httpCode/httpCode.model";
import User from "./user.model";
import UserServiceInterface from "./user.service.interface";

export class UserServiceMock implements UserServiceInterface {

  users: User[]

  constructor() {
    this.users = []
    this.users.push(new User(
      1,
      "email@email.com",
      "password"
    ))
    this.users.push(new User(
      2, 
      "email2@email.com",
      "password2"
    ))
  }
  getUsers(): User[] {
    return this.users
  }

  createUser(newUser: User): User {
    for (const user of this.users) {
      if (user.email === newUser.email) {
        throw new AppError('User already exists', HttpCode.BadRequest, `User with this email: ${newUser.email} already exists`)
      }
    }

    this.users.push(newUser)
    this.users[this.users.length -1].id = this.users.length
    return this.users[this.users.length -1]
  }

  getUser(id: number): User {
    for (const user of this.users) {
      if (user.id === id)
        return user
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${id} was not found`)
  }

  updateUser(updatedUser: User): User {
    for (const user of this.users) {
      if (updatedUser.id === user.id) {
        return updatedUser
      }
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${updatedUser.id} was not found`)
  }

  deleteUser(id: number): User  {
    for (const user of this.users) {
      if (user.id === id) {
        user.deleted = true
        return user
      }
    }
    throw new AppError('User not found', HttpCode.NotFound, `User with this ${id} was not found`)
  }
}
