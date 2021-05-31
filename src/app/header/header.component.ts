import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToDoListService } from '../to-do-list.service';

import { initialFormControlInputValue } from '../constants';

import { toDoItemsActionTypes } from '../to-do-items-action.enum';
import { toDoItemActionTypes } from '../to-do-item-action.enum';


@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private toDoListService: ToDoListService) {}
    
  createToDoItemControl = new FormControl(initialFormControlInputValue);

  createToDoItem(value: string): void {   
    this.toDoListService.changeToDoItem(toDoItemActionTypes.create, {
      value,
      id: Date.now(),      
      isCompleted: false,
  });

    this.createToDoItemControl.setValue(initialFormControlInputValue);
  }

  switchActiveToDoItemsToCompleted(): void {
    this.toDoListService.changeToDoItems(toDoItemsActionTypes.switchActiveToDoItemsToCompleted);
  }
}
