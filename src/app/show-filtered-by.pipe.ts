import { filterTypes } from './filter-types';
import { Pipe, PipeTransform } from '@angular/core';
import { ToDoItem, ToDoItems } from './to-do-item';

@Pipe({
    name: 'showFilteredBy',
    pure: false
})
export class ShowFilteredBy implements PipeTransform {
  transform(toDoItems: ToDoItems, filterType: filterTypes): ToDoItems {
    if (!toDoItems || !filterType) {
      return toDoItems;
    }

    if (filterType === filterTypes.all) {
      return [...toDoItems];
    }
    
    if (filterType === filterTypes.active) {
      return toDoItems.filter((item: ToDoItem) => !item.isCompleted);
    }

    if (filterType === filterTypes.completed) {
      return toDoItems.filter((item: ToDoItem) => item.isCompleted);
    }
  }
}
