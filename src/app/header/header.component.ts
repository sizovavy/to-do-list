import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { INITIAL_FORM_CONTROL_INPUT_VALUE } from '../constants';
import { ToDoItem } from '../to-do-item';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toDoItemEntered = new EventEmitter<ToDoItem>();
  @Output() changeToDoItemsStateEventEmitter = new EventEmitter<Boolean>();
    
  createToDoItemControl = new FormControl(INITIAL_FORM_CONTROL_INPUT_VALUE);  

  addToDoItem(value: string): void {
    this.toDoItemEntered.emit({
      value,
      id: Date.now(),      
      isCompleted: false,
    });

    this.createToDoItemControl.setValue(INITIAL_FORM_CONTROL_INPUT_VALUE);
  }

  changeToDoItemsState(): void {
    this.changeToDoItemsStateEventEmitter.emit();
  }
}
