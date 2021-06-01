import { createReducer, on } from '@ngrx/store';

import { toDoItemActions } from 'src/app/to-do-item-actions';
import { toDoItemsActions } from 'src/app/to-do-items-actions';
import { 
    ChangeToDoItemCompletedStatus, 
    ClearCompletedToDoItems, 
    CreateToDoItem, 
    DeleteToDoItem, 
    SwitchActiveToDoItemsToCompleted 
} from '../actions/to-do-items.action';

import { initialToDoItemsState } from '../state/to-do-items.state';

import { toDoItemActionTypes } from 'src/app/to-do-item-action.enum';
import { toDoItemsActionTypes } from 'src/app/to-do-items-action.enum';

export const toDoItemsReducer = createReducer(
    initialToDoItemsState,
    on(CreateToDoItem, (state, toDoItem) => ({ 
        toDoItems: toDoItemActions[toDoItemActionTypes.create](state.toDoItems, toDoItem)
    })),

    on(DeleteToDoItem, (state, toDoItem) => ({ 
        toDoItems: toDoItemActions[toDoItemActionTypes.delete](state.toDoItems, toDoItem)
    })),

    on(ChangeToDoItemCompletedStatus, (state, toDoItem) => ({ 
        toDoItems: toDoItemActions[toDoItemActionTypes.selectionToggle](state.toDoItems, toDoItem)
    })),

    on(SwitchActiveToDoItemsToCompleted, (state) => ({ 
        toDoItems: toDoItemsActions[toDoItemsActionTypes.switchActiveToDoItemsToCompleted](state.toDoItems)
    })),

    on(ClearCompletedToDoItems, (state) => ({ 
        toDoItems: toDoItemsActions[toDoItemsActionTypes.clearCompletedToDoItems](state.toDoItems)
    })),
);
