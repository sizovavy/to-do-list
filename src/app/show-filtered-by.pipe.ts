import { Pipe, PipeTransform } from '@angular/core';
import { filterTypes } from './filter-types.enum';
import { ToDoItem, ToDoItems } from './to-do-item.type';

@Pipe({
    name: 'showFilteredBy',
})
export class ShowFilteredBy implements PipeTransform {
  transform(toDoItems: ToDoItems, filterType: filterTypes): ToDoItems {
    const filteredToDoItems = {
      [filterTypes.all]: toDoItems,
      [filterTypes.active]: toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted),
      [filterTypes.completed]: toDoItems.filter(({ isCompleted }: ToDoItem) => isCompleted),
    }

    return filteredToDoItems[filterType]
  }
}
