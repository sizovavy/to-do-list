import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { filterTypes } from './../filter-types';
import { ToDoItem, ToDoItems } from '../to-do-item';
import { Subscription } from 'rxjs';
import { ToDoListService } from '../to-do-list.service';

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnDestroy {
  @Output() changeToDoItemsFilterTypeEventEmitter = new EventEmitter<filterTypes>();

  activeToDoItemsCount: number;
  filterTypes = filterTypes;
  toDoItems: ToDoItems;
  subscription: Subscription;  

  constructor(private toDoListService: ToDoListService) {
    this.subscription = this.toDoListService.onToDoList().subscribe(
      toDoItems => {
        this.activeToDoItemsCount = toDoItems.filter(({ isCompleted }) => !isCompleted).length;
        this.toDoItems = toDoItems;
      }  
    );    
  }

  onToDoItemsFilterTypeChange(event: Event): void {
    this.changeToDoItemsFilterTypeEventEmitter.emit((event.target as HTMLInputElement).value as filterTypes);
  }

  clearCompletedToDoItems(): void {
    this.toDoListService.setToDoList(this.toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted ));
  }  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
