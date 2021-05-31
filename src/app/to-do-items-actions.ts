import { ToDoItem, ToDoItems } from './to-do-item.type';

import { toDoItemsActionTypes } from './to-do-items-action.enum';

const clearCompletedToDoItems = (toDoItems: ToDoItems): ToDoItems =>     
    toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted )

const switchActiveToDoItemsToCompleted = (toDoItems: ToDoItems): ToDoItems => {
    const hasActiveToDoItems = toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);

    return toDoItems.map((toDoItem: ToDoItem) => ({ 
        ...toDoItem, 
        isCompleted: hasActiveToDoItems,
    }))
}

export const toDoItemsActions: ToDoItemsActions = {
    [toDoItemsActionTypes.clearCompletedToDoItems]: clearCompletedToDoItems,
    [toDoItemsActionTypes.switchActiveToDoItemsToCompleted]: switchActiveToDoItemsToCompleted,
};

type ToDoItemsActions = {
    [actionType in toDoItemsActionTypes]: (toDoItems: ToDoItems) => ToDoItems;
  }
