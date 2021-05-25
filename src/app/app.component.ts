import { Component } from '@angular/core';
import { emptyToDoItems, title } from './constants';
import { filterTypes } from './filter-types';
import { ToDoItem, ToDoItems } from './to-do-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = title;

  filterType = filterTypes.all;

  applyFilter(filterType: filterTypes): void {
    this.filterType = filterType;
  }
}
