import { Component, Input } from '@angular/core';

import { ToDoListService } from '../to-do-list.service';

import { actionTypes } from '../action-types.enum';
import { ToDoItem } from '../to-do-item.type';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
  @Input() toDoItem: ToDoItem;

  actionTypes = actionTypes;

  constructor(private toDoListService: ToDoListService) {}

  onToDoItemStateChange(actionType): void {
    this.toDoListService.changeToDoItemByAction(actionType, this.toDoItem.id);  
  }
}
