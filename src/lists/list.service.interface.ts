import { FilterBy } from "../models/filter";
import List from "./list.model";

export default interface ListServiceInterface {
    getLists(page: number, limit: number, filterBy: FilterBy): List[]
    createList(newList: List): List
    getList(id: number): List
    updateList(updatedList: List): List 
    deleteList(id: number): List
}
