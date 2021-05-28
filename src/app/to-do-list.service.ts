import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { businessActions } from './business-actions';
import { filteredToDoItems } from './filtered-to-do-items';

import { emptyToDoItems, initialFilterType } from './constants';

import { filterTypes } from './filter-types.enum';
import { businessActionTypes } from './business-action.enum';

import { ToDoItems } from './to-do-item.type';

@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = new BehaviorSubject<ToDoItems>(emptyToDoItems);
    readonly toDoItemFilterType$ = new BehaviorSubject<filterTypes>(initialFilterType);

    readonly filteredToDoItems$ = combineLatest([this.toDoItems$, this.toDoItemFilterType$]).pipe(
        map(([toDoItems, filterType]: [ToDoItems, filterTypes]) => filteredToDoItems[filterType](toDoItems))
    )

    readonly activeToDoItemsCount$ = this.toDoItems$.pipe(
        map((toDoItems: ToDoItems) => this.getActiveToDoItemsCount(toDoItems))
    )    

    changeToDoItemsFilterType(event: Event): void {
        this.toDoItemFilterType$.next((event.target as HTMLInputElement).value as filterTypes);
    }

    emitNewToDoItems(businessAction: businessActionTypes, ...args): void {
        const toDoItems = this.toDoItems$.getValue();
        this.toDoItems$.next(businessActions[businessAction].apply(null, [toDoItems, ...args]));
    }

    private getActiveToDoItemsCount(toDoItems: ToDoItems): number {
        return toDoItems.filter(({ isCompleted }) => !isCompleted).length
    }
}
