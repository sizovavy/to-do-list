import { Component } from '@angular/core';

import { ToDoListService } from '../to-do-list.service';

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent {
  toDoItems$ = this.toDoListService.toDoItems$;
  toDoItemsFilterType$ = this.toDoListService.toDoItemFilterType$;

  constructor(private toDoListService: ToDoListService) {}
}
