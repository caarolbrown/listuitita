import List from "./list.model";

export default interface ListServiceInterface {
    getLists(page: number, limit: number): List[]
    createList(newList: List): List
    getList(id: number): List
    updateList(updatedList: List): List 
    deleteList(id: number): List
}
