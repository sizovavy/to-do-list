import { Component, Input } from '@angular/core';

import { ToDoListService } from '../to-do-list.service';

import { actionTypes } from '../action-types.enum';
import { ToDoItem } from '../to-do-item.type';
import { businessActionTypes } from '../business-action.enum';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
  @Input() toDoItem: ToDoItem;

  readonly actionTypes = actionTypes;

  constructor(private toDoListService: ToDoListService) {}

  onToDoItemStateChange(actionType: actionTypes): void {
    this.toDoListService.emitNewToDoItems(businessActionTypes.changeToDoItem, actionType, this.toDoItem.id);
  }
}
