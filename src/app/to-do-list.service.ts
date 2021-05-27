import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { toDoItemActions } from './to-do-item-actions';

import { emptyToDoItems, initialFilterType } from './constants';

import { filterTypes } from './filter-types.enum';
import { actionTypes } from './action-types.enum';

import { ToDoItem, ToDoItems } from './to-do-item.type';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = new BehaviorSubject<ToDoItems>(emptyToDoItems);
    readonly toDoItemFilterType$ = new BehaviorSubject<filterTypes>(initialFilterType);

    readonly filteredToDoItems$ = combineLatest([this.toDoItems$, this.toDoItemFilterType$]).pipe(
        map(([toDoItems, filterType]: [ToDoItems, filterTypes]) => {
            const filteredToDoItems = {
              [filterTypes.all]: toDoItems,
              [filterTypes.active]: toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted),
              [filterTypes.completed]: toDoItems.filter(({ isCompleted }: ToDoItem) => isCompleted),
            }
        
            return filteredToDoItems[filterType]
          })
    )

    readonly activeToDoItemsCount$ = this.toDoItems$.pipe(
        map((toDoItems: ToDoItems) => toDoItems.filter(({ isCompleted }) => !isCompleted).length)
      );
    

    changeToDoItemsFilterType(event: Event): void {
        this.toDoItemFilterType$.next((event.target as HTMLInputElement).value as filterTypes)
    }
    
    changeToDoItemByAction(actionType: actionTypes, toDoItemId: number): void {
        this.emitToDoItems(toDoItemActions[actionType](this.toDoItems, toDoItemId));    
    }

    createToDoItem(toDoItem: ToDoItem): void {
        this.emitToDoItems([...this.toDoItems, toDoItem]);
    }

    switchActiveToDoItemsToCompleted(): void {
        const hasActiveToDoItems = this.toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);

        this.emitToDoItems(this.toDoItems.map((toDoItem: ToDoItem) => ({ 
            ...toDoItem, 
            isCompleted: hasActiveToDoItems,
        })));
    }

    clearCompletedToDoItems(): void {
        this.emitToDoItems(this.toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted ));
    }
    
    private get toDoItems(): ToDoItems{
        return this.toDoItems$.getValue();
    }

    private emitToDoItems(toDoItems: ToDoItems): void {
        this.toDoItems$.next(toDoItems); 
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