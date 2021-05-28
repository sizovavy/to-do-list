import { Component } from '@angular/core';

import { map } from 'rxjs/operators';

import { ToDoListService } from '../to-do-list.service';

import { filterTypes } from '../filter-types.enum';
import { ToDoItems } from '../to-do-item.type';
import { businessActionTypes } from '../business-action.enum';

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
  activeToDoItemsCount$ = this.toDoListService.activeToDoItemsCount$;

  readonly filterTypes = filterTypes;  

  constructor(private toDoListService: ToDoListService) {}

  changeToDoItemsFilterType(event: Event): void {
    this.toDoListService.changeToDoItemsFilterType(event);
  }

  clearCompletedToDoItems(): void {
    this.toDoListService.emitNewToDoItems(businessActionTypes.clearCompletedToDoItems);
  }
}
