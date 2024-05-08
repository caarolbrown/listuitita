import List from "./list.model";

export default interface ListServiceInterface {
    getLists(): List[]
    createList(newList: List): List
    getList(id: number): List
    updateList(updatedList: List): List 
    deleteList(id: number): List
}
