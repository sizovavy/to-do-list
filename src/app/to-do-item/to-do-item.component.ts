import { Component, Input } from '@angular/core';

import { ToDoListService } from '../to-do-list.service';

import { toDoItemActionTypes } from './../to-do-item-action.enum';

import { ToDoItem } from '../to-do-item.type';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
  @Input() toDoItem: ToDoItem;

  readonly toDoItemActionTypes = toDoItemActionTypes;

  constructor(private toDoListService: ToDoListService) {}

  onToDoItemStateChange(toDoItemActionType: toDoItemActionTypes): void {
    this.toDoListService.changeToDoItem(toDoItemActionType, this.toDoItem);
  }
}
