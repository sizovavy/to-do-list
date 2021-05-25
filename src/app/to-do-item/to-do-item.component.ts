import { actionTypes } from './../actions.type';
import { Component, Input, OnDestroy } from '@angular/core';
import { ToDoItem, ToDoItems } from '../to-do-item';
import { ToDoListService } from '../to-do-list.service';
import { Subscription } from 'rxjs';
import { toDoItemActions } from '../to-do-item-actions';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent implements OnDestroy{
  @Input() toDoItem: ToDoItem;

  subscription: Subscription;
  toDoItems: ToDoItems;

  constructor(private toDoListService: ToDoListService) {
    this.subscription = this.toDoListService.onToDoList().subscribe((toDoItems: ToDoItems) => this.toDoItems = toDoItems);
  }

  onToDoItemStateChange(): void {
    this.setToDoList(toDoItemActions[actionTypes.selectionToggle](this.toDoItems, this.toDoItem.id));    
  }
     
  onToDoItemDelete(): void {
    this.setToDoList(toDoItemActions[actionTypes.delete](this.toDoItems, this.toDoItem.id));    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setToDoList(toDoItems: ToDoItems): void {
    this.toDoListService.setToDoList(toDoItems);
  }
}
