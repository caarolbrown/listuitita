import User from "./user.model";

export default interface UserServiceInterface {
    getUsers(): User[]
    createUser(newUser: User): User
    getUser(id: number): User
    updateUser(updateUser: User): User
    deleteUser(id: number): User
}
