import { Component } from '@angular/core';

import { ToDoListService } from '../to-do-list.service';

import { filterTypes } from '../filter-types.enum';
import { toDoItemsActionTypes } from '../to-do-items-action.enum';

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
  activeToDoItemsCount$ = this.toDoListService.activeToDoItemsCount$;

  readonly filterTypes = filterTypes;

  constructor(private toDoListService: ToDoListService) {}

  changeToDoItemsFilterType(event: Event): void {
    this.toDoListService.changeToDoItemsFilterType((event.target as HTMLInputElement).value as filterTypes);
  }

  clearCompletedToDoItems(): void {    
    this.toDoListService.changeToDoItems(toDoItemsActionTypes.clearCompletedToDoItems);
  }
}
