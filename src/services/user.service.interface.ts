import User from "../models/user";

export default interface UserServiceInterface {
    getUsers(): User[]
    createUser(newUser: User): User | undefined
    getUser(id: number): User | undefined
    updateUser(updateUser: User): User | undefined
    deleteUser(id: number): User | undefined
}
