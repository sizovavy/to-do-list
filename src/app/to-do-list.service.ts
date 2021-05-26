import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { toDoItemActions } from './to-do-item-actions';

import { emptyToDoItems, initialFilterType } from './constants';

import { filterTypes } from './filter-types.enum';
import { actionTypes } from './action-types.enum';

import { ToDoItem, ToDoItems } from './to-do-item.type';


@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = new BehaviorSubject<ToDoItems>(emptyToDoItems);
    readonly toDoItemFilterType$ = new BehaviorSubject<filterTypes>(initialFilterType);

    changeToDoItemsFilterType(event: Event): void {
        this.toDoItemFilterType$.next((event.target as HTMLInputElement).value as filterTypes)
    }

    private emitToDoItems(toDoItems: ToDoItems): void {
        this.toDoItems$.next(toDoItems); 
    }
    
    changeToDoItemByAction(actionType: actionTypes, toDoItemId: number): void {
        const toDoItems = this.toDoItems$.getValue();
        this.emitToDoItems(toDoItemActions[actionType](toDoItems, toDoItemId));    
    }

    createToDoItem(toDoItem: ToDoItem): void {
        const toDoItems = this.toDoItems$.getValue();
        this.emitToDoItems([...toDoItems, toDoItem]);
    }

    switchActiveToDoItemsToCompleted(): void {
        const toDoItems = this.toDoItems$.getValue();
        const hasActiveToDoItems = toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);

        this.emitToDoItems(toDoItems.map((toDoItem: ToDoItem) => ({ 
            ...toDoItem, 
            isCompleted: hasActiveToDoItems,
        })));
    }

    clearCompletedToDoItems(): void {
        const toDoItems = this.toDoItems$.getValue();
        this.emitToDoItems(toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted ));
    }
}

// class Store {
//     dispatch(){}
//     subscribe(){} 
//     getState(){}
//     unsubscribe(){}
// }

// const store = new Store(reducer);
// store.subscribe()() //subscribe-unsubscribe