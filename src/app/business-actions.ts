import { toDoItemActions } from './to-do-item-actions';

import { actionTypes } from './action-types.enum';
import { businessActionTypes } from './business-action.enum';

import { ToDoItem, ToDoItems } from './to-do-item.type';

const changeToDoItem = (toDoItems: ToDoItems, actionType: actionTypes, toDoItemId: number): ToDoItems =>     
    toDoItemActions[actionType](toDoItems, toDoItemId);

const createToDoItem = (toDoItems: ToDoItems, toDoItem: ToDoItem): ToDoItems => [...toDoItems, toDoItem];

const clearCompletedToDoItems = (toDoItems: ToDoItems): ToDoItems =>     
    toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted )

const switchActiveToDoItemsToCompleted = (toDoItems: ToDoItems): ToDoItems => {
    const hasActiveToDoItems = toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);

    return toDoItems.map((toDoItem: ToDoItem) => ({ 
        ...toDoItem, 
        isCompleted: hasActiveToDoItems,
    }))
}

export const businessActions = {
    [businessActionTypes.changeToDoItem]: changeToDoItem,
    [businessActionTypes.createToDoItem]: createToDoItem,
    [businessActionTypes.clearCompletedToDoItems]: clearCompletedToDoItems,
    [businessActionTypes.switchActiveToDoItemsToCompleted]: switchActiveToDoItemsToCompleted,
};