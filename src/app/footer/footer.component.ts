import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { filterTypes } from './../filter-types';
import { ToDoItem, ToDoItems } from '../to-do-item';

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnChanges{
  @Input() toDoItems: ToDoItems;

  @Output() changeToDoItemsFilterTypeEventEmitter = new EventEmitter<filterTypes>();
  @Output() clearCompletedToDoItemsEventEmitter = new EventEmitter<ToDoItems>();

  activeToDoItemsCount: number;
  filterTypes = filterTypes;

  ngOnChanges(): void {    
    this.activeToDoItemsCount = this.toDoItems.filter(({ isCompleted }) => !isCompleted).length;
  }

  onToDoItemsFilterTypeChange(event: Event): void {
    this.changeToDoItemsFilterTypeEventEmitter.emit((event.target as HTMLInputElement).value as filterTypes);
  }

  clearCompletedToDoItems(): void {
    const activeToDoItems = this.toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted );
    this.clearCompletedToDoItemsEventEmitter.emit(activeToDoItems);
  }
}
