import { UserFilterBy } from "../models/filter";
import User from "./user.model";

export default interface UserServiceInterface {
    getUsers(filterBy: UserFilterBy): Promise<User[]>
    createUser(newUser: User): Promise<User>
    getUser(id: number): Promise<User>
    updateUser(updateUser: User): Promise<User>
    deleteUser(id: number): Promise<User>
}
