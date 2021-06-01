import { FilterTypeState } from './filter-type.state'
import { ToDoItemsState } from './to-do-items.state'

export interface AppState {
    toDoItemsState: ToDoItemsState,
    filterTypeState: FilterTypeState,
}