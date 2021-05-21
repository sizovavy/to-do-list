import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListItem } from '../item';
    
@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
     
  @Input() listItem: ListItem;
  @Input() allChecked: boolean;
  @Output() stateChanged = new EventEmitter<ListItem>();

  checkBoxInput = new FormControl('');
  
  ngOnChanges(){
    this.checkBoxInput.setValue(this.listItem.completed);
  }

  onCompletedStateChange(event: Event){
    const target = event.target as HTMLInputElement;
    this.stateChanged.emit(
      {
        id: this.listItem.id, 
        value: this.listItem.value,
        completed: target.checked
      }
    );
  }
     
  onDeleteListItem(){
    this.stateChanged.emit(
      {
        id: this.listItem.id,
        completed: this.listItem.completed
      }
    );
  }
}