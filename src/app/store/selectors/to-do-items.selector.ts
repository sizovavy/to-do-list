import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { ToDoItemsState } from '../state/to-do-items.state';

const toDoItemsState = (state: AppState) => state.toDoItems;

export const selectToDoItems = createSelector(toDoItemsState,(state: ToDoItemsState)=> state.toDoItems)