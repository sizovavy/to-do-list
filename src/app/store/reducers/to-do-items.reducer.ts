import { createReducer, on } from '@ngrx/store';

import { 
    changeToDoItemCompletedStatus, 
    clearCompletedToDoItems, 
    createToDoItem, 
    deleteToDoItem, 
    switchActiveToDoItemsToCompleted 
} from '../actions/to-do-items.action';

import { ToDoItemsState } from './../state/to-do-items.state';
import { initialToDoItemsState } from '../state/to-do-items.state';

import { ToDoItem } from './../../to-do-item.type';

const createToDoItemReducer = ({ toDoItems }: ToDoItemsState, toDoItem: ToDoItem): ToDoItemsState => ({ 
    toDoItems: [...toDoItems, toDoItem]
});

const clearCompletedToDoItemsReducer = ({ toDoItems }: ToDoItemsState): ToDoItemsState => ({    
    toDoItems: toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted )
});

const switchActiveToDoItemsToCompletedReducer = ({ toDoItems }: ToDoItemsState): ToDoItemsState => {
    const hasActiveToDoItems = toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);

    return {
        toDoItems: toDoItems.map((toDoItem: ToDoItem) => ({ 
            ...toDoItem, 
            isCompleted: hasActiveToDoItems,
        }))
    }
};

const deleteToDoItemReducer = ({ toDoItems }: ToDoItemsState, { id: toDoItemIdForDeleting }): ToDoItemsState => ({
    toDoItems: toDoItems.filter(({ id }: ToDoItem) => id !== toDoItemIdForDeleting)
});
    

const ChangeToDoItemCompletedStatusReducer = ({ toDoItems }: ToDoItemsState, { id: toDoItemIdForUpdating }): ToDoItemsState => ({
    toDoItems: toDoItems.map((toDoItem: ToDoItem) => ({
        ...toDoItem, 
        isCompleted: toDoItem.id === toDoItemIdForUpdating ? !toDoItem.isCompleted : toDoItem.isCompleted,
    }))
});

export const toDoItemsReducer = createReducer(
    initialToDoItemsState,
    on(createToDoItem, createToDoItemReducer),
    on(deleteToDoItem, deleteToDoItemReducer),
    on(changeToDoItemCompletedStatus, ChangeToDoItemCompletedStatusReducer),
    on(switchActiveToDoItemsToCompleted, switchActiveToDoItemsToCompletedReducer),
    on(clearCompletedToDoItems, clearCompletedToDoItemsReducer),
);
