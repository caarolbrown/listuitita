import { FilterBy } from "../models/filter";
import List from "./list.model";

export default interface ListServiceInterface {
    getLists(page: number, limit: number, filterBy: FilterBy): Promise<List[]>
    createList(newList: List): Promise<List>
    getList(id: number): Promise<List>
    updateList(updatedList: List): Promise<List> 
    deleteList(id: number): Promise<List>
}
