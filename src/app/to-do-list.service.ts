import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { filterTypes } from './filter-types.enum';
import { actionTypes } from './action-types.enum';
import { ToDoItem, ToDoItems } from './to-do-item.type';
import { toDoItemActions } from './to-do-item-actions';
import { emptyToDoItems, initialFilterType } from './constants';

@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = new BehaviorSubject<ToDoItems>(emptyToDoItems);
    readonly toDoItemFilterType$ = new BehaviorSubject<filterTypes>(initialFilterType);

    changeToDoItemsFilterType(event: Event): void {
        this.toDoItemFilterType$.next((event.target as HTMLInputElement).value as filterTypes)
    }

    private emitToDoItems(toDoItems: Observable<ToDoItems>): void {
        toDoItems.subscribe((toDoItems: ToDoItems) => this.toDoItems$.next(toDoItems)); 
    }
    
    changeToDoItemByAction(actionType: actionTypes, toDoItemId: number): void {
        this.emitToDoItems(
            this.toDoItems$.pipe(
                map((toDoItems: ToDoItems) => toDoItemActions[actionType](toDoItems, toDoItemId)),
                take(1)
            )
        )    
    }

    createToDoItem(toDoItem: ToDoItem): void {
        this.emitToDoItems(
            this.toDoItems$.pipe(
                map((toDoItems: ToDoItems) => [...toDoItems, toDoItem]),
                take(1)
            )
        )
    }

    switchActiveToDoItemsToCompleted(): void {
        this.emitToDoItems(
            this.toDoItems$.pipe(
                map((toDoItems: ToDoItems) => 
                    toDoItems.map((toDoItem: ToDoItem) => ({ 
                        ...toDoItem, 
                        isCompleted: toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted),
                    }))
                ),
                take(1)
            )
        )
    }

    clearCompletedToDoItems(): void{
        this.emitToDoItems(
            this.toDoItems$.pipe(
                map((toDoItems: ToDoItems) => toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted )),
                take(1)
            )
        )
    }
}