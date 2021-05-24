import { Component } from '@angular/core';
import { EMPTY_TO_DO_ITEMS, TITLE } from './constants';
import { filterTypes } from './filter-types';
import { ToDoItem, ToDoItems } from './to-do-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = TITLE;
  
  toDoItems = EMPTY_TO_DO_ITEMS;

  areAllToDoItemsCompleted = false;
  filterType = filterTypes.all;
  
  createToDoItem(toDoItem: ToDoItem): void {
    this.toDoItems = [...this.toDoItems, toDoItem];
  }

  applyFilter(filterType: filterTypes): void {
    this.filterType = filterType;
  }

  changeToDoItemsState(): void {
    const hasActiveToDoItems = this.toDoItems.some(({ isCompleted }: ToDoItem) => !isCompleted);
    this.toDoItems = this.toDoItems.map((toDoItem: ToDoItem) => ({ ...toDoItem, isCompleted: hasActiveToDoItems }));
  }
}
