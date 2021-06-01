import { createAction, props } from '@ngrx/store';
import { ToDoItem } from '../../to-do-item.type';

export const createToDoItem = createAction(
    '[ToDoItems] Create ToDoItem',
    props<ToDoItem>()
);

export const deleteToDoItem = createAction(
    '[ToDoItems] Delete ToDoItem',
    props<{ id: number }>()
);

export const changeToDoItemCompletedStatus = createAction(
    '[ToDoItems] Change ToDoItem Completed Status',
    props<{ id: number }>()
);

export const switchActiveToDoItemsToCompleted = createAction(
    '[ToDoItems] Switch Active ToDoItems To Completed',
);

export const clearCompletedToDoItems = createAction(
    '[ToDoItems] Clear Completed ToDoItems',
);
