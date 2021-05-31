import { toDoItemActionTypes } from './to-do-item-action.enum';


export type ToDoItemAction = {
    id: number;
    actionType: toDoItemActionTypes;
}
