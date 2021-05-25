import { ToDoItemAction } from '../to-do-item-action';
import { ToDoItems } from '../to-do-item';
import { filterTypes } from '../filter-types';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toDoItemActions } from '../to-do-item-actions';
import { ToDoListService } from '../to-do-list.service';
import { Observable, Subscription } from 'rxjs';
import { switchAll, switchMap } from 'rxjs/operators';

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent {
  @Input() filterType: filterTypes;

  toDoItems$ = this.toDoListService.onToDoList();

  constructor(private toDoListService: ToDoListService) {}
}
