import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { toDoItemActions } from './to-do-item-actions';
import { toDoItemsActions } from './to-do-items-actions';

import { filteredToDoItems } from './filtered-to-do-items';

import { emptyToDoItems, initialFilterType } from './constants';

import { ToDoItem, ToDoItems } from './to-do-item.type';

import { filterTypes } from './filter-types.enum';
import { toDoItemActionTypes } from './to-do-item-action.enum';
import { toDoItemsActionTypes } from './to-do-items-action.enum';


@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = new BehaviorSubject<ToDoItems>(emptyToDoItems);
    readonly toDoItemFilterType$ = new BehaviorSubject<filterTypes>(initialFilterType);

    readonly filteredToDoItems$ = combineLatest([this.toDoItems$, this.toDoItemFilterType$]).pipe(
        map(([toDoItems, filterType]: [ToDoItems, filterTypes]) => filteredToDoItems[filterType](toDoItems))
    )

    readonly activeToDoItemsCount$ = this.toDoItems$.pipe(
        map(this.getActiveToDoItemsCount)
    )    

    changeToDoItemsFilterType(filterType: filterTypes): void {
        this.toDoItemFilterType$.next(filterType);
    }

    changeToDoItem(toDoItemActionType: toDoItemActionTypes, toDoItem: ToDoItem): void {
        const toDoItems = this.toDoItems$.getValue();
        this.toDoItems$.next(toDoItemActions[toDoItemActionType](toDoItems, toDoItem));
    }

    changeToDoItems(toDoItemsActionType: toDoItemsActionTypes): void {
        const toDoItems = this.toDoItems$.getValue();
        this.toDoItems$.next(toDoItemsActions[toDoItemsActionType](toDoItems));
    }

    private getActiveToDoItemsCount(toDoItems: ToDoItems): number {
        return toDoItems.filter(({ isCompleted }) => !isCompleted).length
    }
}
