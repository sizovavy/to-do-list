import { actionTypes } from './action-types.enum';

export type ToDoItemAction = {
    id: number;
    actionType: actionTypes;
}
