import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToDoListService } from '../to-do-list.service';

import { initialFormControlInputValue } from '../constants';
import { businessActionTypes } from '../business-action.enum';


@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private toDoListService: ToDoListService) {}
    
  createToDoItemControl = new FormControl(initialFormControlInputValue);  

  addToDoItem(value: string): void {

    this.toDoListService.emitNewToDoItems(businessActionTypes.createToDoItem, {
        value,
        id: Date.now(),      
        isCompleted: false,
    });

    this.createToDoItemControl.setValue(initialFormControlInputValue);
  }

  switchActiveToDoItemsToCompleted(): void {
    this.toDoListService.emitNewToDoItems(businessActionTypes.switchActiveToDoItemsToCompleted);
  }
}
