import { ToDoItemStateTransfer } from '../item-state-transfer';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { filterTypes } from "../filter-types";
import { ToDoItem, ToDoItems } from "../to-do-item";

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent {
  @Input() toDoItems: ToDoItems;
  @Input() filterType = filterTypes.all;

  @Output() toDoItemsChange = new EventEmitter<ToDoItems>();

  onToDoItemStateChange(event: ToDoItemStateTransfer): void {
    if (event.isDeleted) {
      this.toDoItemsChange.emit(this.toDoItems.filter((toDoItem: ToDoItem) => toDoItem.id !== event.id));
      return;
    }

    const toDoItemIndex = this.toDoItems.findIndex((toDoItem: ToDoItem) => toDoItem.id === event.id );
    let toDoItemsNew = [...this.toDoItems];
    toDoItemsNew[toDoItemIndex] = {...toDoItemsNew[toDoItemIndex], isCompleted: event.isCompleted};

    this.toDoItemsChange.emit(toDoItemsNew);
  }
}
