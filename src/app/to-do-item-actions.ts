import { actionTypes } from './action-types.enum';

import { ToDoItems, ToDoItem } from './to-do-item.type';

const getToDoItemsWithoutDeleted = (toDoItems: ToDoItems, toDoItemId: number): ToDoItems => 
    toDoItems.filter(({ id }: ToDoItem) => id !== toDoItemId);

const getToDoItemsWithUpdatedState = (toDoItems: ToDoItems, toDoItemId: number): ToDoItems => 
  toDoItems.map((toDoItem: ToDoItem) => ({
      ...toDoItem, 
      isCompleted: toDoItem.id === toDoItemId ? !toDoItem.isCompleted : toDoItem.isCompleted,
  }));

export const toDoItemActions: ToDoItemActions = {
  [actionTypes.selectionToggle]: getToDoItemsWithUpdatedState,
  [actionTypes.delete]: getToDoItemsWithoutDeleted,
}           

type ToDoItemActions = {
  [actionType in actionTypes]: (toDoItems: ToDoItems, toDoItemId: number) => ToDoItems;
}