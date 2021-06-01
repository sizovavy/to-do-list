import { Injectable } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { filteredToDoItems } from './filtered-to-do-items';

import { AppState } from './store/state/app.state';

import { selectFilterType } from './store/selectors/filter-type.selector';
import { selectToDoItems } from './store/selectors/to-do-items.selector';

import { ToDoItems } from './to-do-item.type';

import { filterTypes } from './filter-types.enum';


@Injectable({ providedIn: 'root' })
export class ToDoListService {
    readonly toDoItems$ = this.store.pipe(select(selectToDoItems))
    readonly toDoItemFilterType$ = this.store.pipe(select(selectFilterType));

    readonly filteredToDoItems$ = combineLatest([this.toDoItems$, this.toDoItemFilterType$]).pipe(
        map(([toDoItems, filterType]: [ToDoItems, filterTypes]) => filteredToDoItems[filterType](toDoItems))
    )

    readonly activeToDoItemsCount$ = this.toDoItems$.pipe(
        map(this.getActiveToDoItemsCount)
    )   
    
    constructor(private readonly store: Store<AppState>,){}

    private getActiveToDoItemsCount(toDoItems: ToDoItems): number {
        return toDoItems.filter(({ isCompleted }) => !isCompleted).length
    }
}
