import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { initialFormControlInputValue } from '../constants';
import { ToDoItem, ToDoItems } from '../to-do-item';
import { ToDoListService } from '../to-do-list.service';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  subscription: Subscription;
  toDoItems: ToDoItems;  

  constructor(private toDoListService: ToDoListService) {
    this.subscription = this.toDoListService.onToDoList().subscribe(toDoItems => this.toDoItems = toDoItems);    
  }
    
  createToDoItemControl = new FormControl(initialFormControlInputValue);  

  addToDoItem(value: string): void {
    this.setToDoList([
      ...this.toDoItems,
      {
        value,
        id: Date.now(),      
        isCompleted: false,
      }
    ]);

    this.createToDoItemControl.setValue(initialFormControlInputValue);
  }

  changeToDoItemsState(): void {
    const hasActiveToDoItems = this.toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);
    this.setToDoList(
      this.toDoItems.map((toDoItem: ToDoItem) => ({ ...toDoItem, isCompleted: hasActiveToDoItems }))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setToDoList(toDoItems: ToDoItems): void {
    this.toDoListService.setToDoList(toDoItems);
  }
}
