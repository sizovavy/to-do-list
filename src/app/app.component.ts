import { Component } from '@angular/core';
import { filterTypes } from './filter-types';
import { ToDoItem, ToDoItems } from './to-do-item';

const title = 'to-do-list';
const emptyToDoItems: ToDoItems = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = title;
  
  toDoItems = emptyToDoItems;

  areAllToDoItemsCompleted = false;
  filterType = filterTypes.all;
  
  createToDoItem(toDoItem: ToDoItem): void {
    this.toDoItems = [...this.toDoItems, toDoItem];
  }

  applyFilter(filterType: filterTypes): void {
    this.filterType = filterType;
  }

  checkActiveToDoItems(): void {
    const hasActiveToDoItems = !!this.toDoItems.find(({ isCompleted }) => !isCompleted);
    this.toDoItems = this.toDoItems.map((toDoItem: ToDoItem) => ({ ...toDoItem, isCompleted: hasActiveToDoItems }));
  }
}