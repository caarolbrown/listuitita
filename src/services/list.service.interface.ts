import List from "../models/list";

export default interface ListServiceInterface {
    getLists(): List[]
    createList(newList: List): List | undefined
    getList(id: number): List | undefined
    updateList(updatedList: List): List | undefined
    deleteList(id: number): List | undefined
}
