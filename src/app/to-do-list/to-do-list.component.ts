import { actionTypes } from './../actions.type';
import { ToDoItemAction } from '../to-do-item-action';
import { ToDoItem, ToDoItems } from '../to-do-item';
import { filterTypes } from '../filter-types';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent {
  @Input() toDoItems: ToDoItems;
  @Input() filterType: filterTypes;

  @Output() changeToDoItemsStateEventEmitter = new EventEmitter<ToDoItems>();

  onChangeToDoItemState({ id, actionType }: ToDoItemAction): void {
    const toDoItemActionsHandlers = {
      [actionTypes.selectionToggle]: this.getToDoItemsWithUpdatedState.bind(this),
      [actionTypes.delete]: this.getToDoItemsWithoutDeleted.bind(this),
    }

    this.changeToDoItemsStateEventEmitter.emit(toDoItemActionsHandlers[actionType](id));
  }

  private getToDoItemsWithoutDeleted(toDoItemId: number): ToDoItems {
    return this.toDoItems.filter(({ id }: ToDoItem) => id !== toDoItemId);
  }

  private getToDoItemsWithUpdatedState(toDoItemId: number): ToDoItems {
    return this.toDoItems.map((toDoItem: ToDoItem) => ({
        ...toDoItem, 
        isCompleted: toDoItem.id === toDoItemId ? !toDoItem.isCompleted : toDoItem.isCompleted,
    }));
  }
}
