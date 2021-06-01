import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { toDoItemsReducer } from './to-do-items.reducer';
import { filterTypeReducer } from './filter-type.reducer';

export const appReducers: ActionReducerMap<AppState> = {
    toDoItems: toDoItemsReducer,
    filterType: filterTypeReducer,
}