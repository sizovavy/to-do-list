import { createAction, props } from '@ngrx/store';
import { ToDoItem } from '../../to-do-item.type';

export const CreateToDoItem = createAction(
    '[ToDoItems] Create ToDoItem',
    props<ToDoItem>()
);

export const DeleteToDoItem = createAction(
    '[ToDoItems] Delete ToDoItem',
    props<ToDoItem>()
);

export const ChangeToDoItemCompletedStatus = createAction(
    '[ToDoItems] Change ToDoItem Completed Status',
    props<ToDoItem>()
);

export const SwitchActiveToDoItemsToCompleted = createAction(
    '[ToDoItems] Switch Active ToDoItems To Completed',
);

export const ClearCompletedToDoItems = createAction(
    '[ToDoItems] Clear Completed ToDoItems',
);