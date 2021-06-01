import { AppState } from '../state/app.state';

export const toDoItemsSelector = (state: AppState) => state.toDoItemsState.toDoItems;
