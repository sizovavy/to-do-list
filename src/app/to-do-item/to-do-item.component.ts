import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../item';
import { TransferItem } from '../transfer-item';
    
@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
     
  @Input() item:Item;
  @Input() allChecked:boolean;
  @Output() onChange = new EventEmitter<TransferItem>();

  checkBoxInput = new FormControl('');
  
  ngOnChanges(){
    this.checkBoxInput.setValue(this.item.completed)
  }

  onCheckBoxChange(event: Event){
    const target = event.target as HTMLInputElement
    this.onChange.emit(
      {
        id: this.item.id, 
        completed: target.checked
      }
    );
  }
     
  onDelete(){
    this.onChange.emit(
      {
        id: this.item.id, 
        deleted: true
      }
    );
  }
}