import { ToDoItems } from 'src/app/to-do-item.type';


export interface ToDoItemsState {
    toDoItems: ToDoItems;
}

export const initialToDoItemsState: ToDoItemsState = {
    toDoItems: [],
}