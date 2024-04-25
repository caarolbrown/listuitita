import User from "../models/user";
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

  createUser(newUser: User): User | undefined {
    for (const user of this.users) {
      if (user.email === newUser.email) {
        return undefined
      }
    }

    this.users.push(newUser)
    this.users[this.users.length -1].id = this.users.length
    return this.users[this.users.length -1]
  }

  getUser(id: number): User | undefined {
    for (const user of this.users) {
      if (user.id === id)
        return user
    }
    return undefined
  }

  updateUser(updatedUser: User): User | undefined {
    for (const user of this.users) {
      if (updatedUser.id === user.id) {
        return updatedUser
      }
    }
    return undefined
  }

  deleteUser(id: number): User | undefined {
    for (const user of this.users) {
      if (user.id === id) {
        user.deleted = true
      }
    }
    return undefined
  }
}
