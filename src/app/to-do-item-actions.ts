import { actionTypes } from './action-types.enum';
import { ToDoItems, ToDoItem } from './to-do-item.type';

const getToDoItemsWithoutDeletedAction = (toDoItems: ToDoItems, toDoItemId: number): ToDoItems => 
  toDoItems.filter(({ id }: ToDoItem) => id !== toDoItemId);

const getToDoItemsWithUpdatedStateAction = (toDoItems: ToDoItems, toDoItemId: number): ToDoItems => 
  toDoItems.map((toDoItem: ToDoItem) => ({
      ...toDoItem, 
      isCompleted: toDoItem.id === toDoItemId ? !toDoItem.isCompleted : toDoItem.isCompleted,
  }));

export const toDoItemActions: ToDoItemActions = {
  [actionTypes.selectionToggle]: getToDoItemsWithUpdatedStateAction,
  [actionTypes.delete]: getToDoItemsWithoutDeletedAction,
}           

type ToDoItemActions = {
  [actionType in actionTypes]: (toDoItems: ToDoItems, toDoItemId: number) => ToDoItems;
}