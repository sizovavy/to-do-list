import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToDoItem } from '../to-do-item';

const initialToDoItemId = 0;
const toDoItemIdIncrement = 1;
const initialCreateToDoItemInputValue = '';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toDoItemEntered = new EventEmitter<ToDoItem>();
  @Output() checkActiveToDoItemsClicked = new EventEmitter<Boolean>();
    
  createToDoItemInput = new FormControl(initialCreateToDoItemInputValue);
  toDoItemId = initialToDoItemId;

  addToDoItem(event: Event): void {
    this.toDoItemId = this.toDoItemId + toDoItemIdIncrement;
    
    this.toDoItemEntered.emit({
      id: this.toDoItemId,
      value: (event.target as HTMLInputElement).value,
      isCompleted: false
    });

    this.createToDoItemInput.setValue('');
  }

  checkActiveToDoItems(): void {
    this.checkActiveToDoItemsClicked.emit();
  }
}
