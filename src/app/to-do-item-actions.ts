import { toDoItemActionTypes } from './to-do-item-action.enum';

import { ToDoItems, ToDoItem } from './to-do-item.type';

const createToDoItem = (toDoItems: ToDoItems, toDoItem: ToDoItem): ToDoItems => [...toDoItems, toDoItem];

const getToDoItemsWithoutDeleted = (toDoItems: ToDoItems, { id: toDoItemId }: ToDoItem): ToDoItems => 
    toDoItems.filter(({ id }: ToDoItem) => id !== toDoItemId);

const getToDoItemsWithUpdatedState = (toDoItems: ToDoItems, { id: toDoItemId }: ToDoItem): ToDoItems => 
  toDoItems.map((toDoItem: ToDoItem) => ({
      ...toDoItem, 
      isCompleted: toDoItem.id === toDoItemId ? !toDoItem.isCompleted : toDoItem.isCompleted,
  }));

export const toDoItemActions: ToDoItemActions = {
  [toDoItemActionTypes.create]: createToDoItem,
  [toDoItemActionTypes.selectionToggle]: getToDoItemsWithUpdatedState,
  [toDoItemActionTypes.delete]: getToDoItemsWithoutDeleted,
}           

type ToDoItemActions = {
  [actionType in toDoItemActionTypes]: (toDoItems: ToDoItems, toDoItem: ToDoItem) => ToDoItems;
}
