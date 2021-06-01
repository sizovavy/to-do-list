import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { ToDoListService } from '../to-do-list.service';

import { AppState } from '../store/state/app.state';

import { ChangeFilterType } from '../store/actions/filter-type.action';
import { ClearCompletedToDoItems } from '../store/actions/to-do-items.action';

import { filterTypes } from '../filter-types.enum';

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
  activeToDoItemsCount$ = this.toDoListService.activeToDoItemsCount$;

  readonly filterTypes = filterTypes;

  constructor(private readonly store: Store<AppState>, private toDoListService: ToDoListService) {}

  changeToDoItemsFilterType(event: Event): void {
    this.store.dispatch(ChangeFilterType({
      filterType: (event.target as HTMLInputElement).value as filterTypes
    }));   
  }

  clearCompletedToDoItems(): void { 
    this.store.dispatch(ClearCompletedToDoItems());
  }
}
