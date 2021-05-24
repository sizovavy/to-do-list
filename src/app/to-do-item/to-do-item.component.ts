import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToDoItem } from '../to-do-item';
import { ToDoItemAction } from '../to-do-item-action';
import { actionTypes } from '../actions.type';
import { INITIAL_FORM_CONTROL_INPUT_VALUE } from '../constants';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent implements OnChanges{
  @Input() toDoItem: ToDoItem;

  @Output() changeToDoItemStateEventEmitter = new EventEmitter<ToDoItemAction>();

  changeToDoItemStateControl = new FormControl(INITIAL_FORM_CONTROL_INPUT_VALUE);
  
  ngOnChanges(): void { 
    this.changeToDoItemStateControl.setValue(this.toDoItem.isCompleted);
  }

  onToDoItemStateChange(): void {
    this.changeToDoItemStateEventEmitter.emit({
      id: this.toDoItem.id,
      actionType: actionTypes.selectionToggle,
    });
  }
     
  onToDoItemDelete(): void {
    this.changeToDoItemStateEventEmitter.emit({
      id: this.toDoItem.id,
      actionType: actionTypes.delete,
    });
  }
}
