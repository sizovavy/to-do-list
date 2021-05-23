import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToDoItem } from '../to-do-item';
import { ToDoItemStateTransfer } from '../item-state-transfer';
    
@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent implements OnChanges{
  @Input() toDoItem: ToDoItem;

  @Output() toDoItemStateChange = new EventEmitter<ToDoItemStateTransfer>();

  toDoItemCompletedFlag = new FormControl('');
  
  ngOnChanges(): void { 
    this.toDoItemCompletedFlag.setValue(this.toDoItem.isCompleted);
  }

  onToDoItemStateChange(event: Event): void {
    this.toDoItemStateChange.emit({
      id: this.toDoItem.id,
      isCompleted: (event.target as HTMLInputElement).checked,
      isDeleted: false
    });
  }
     
  onToDoItemDelete(): void {
    this.toDoItemStateChange.emit({
      id: this.toDoItem.id,
      isCompleted: this.toDoItem.isCompleted,
      isDeleted: true
    });
  }
}
