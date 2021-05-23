import { filterTypes } from './../filter-types';
import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { ToDoItems } from "../to-do-item";

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnChanges{
  @Input() toDoItems: ToDoItems;

  @Output() filterTypeChange = new EventEmitter<filterTypes>();

  activeToDoItemsCount: number;
  hasCompletedToDoItems: boolean;

  ngOnChanges(): void {
    this.activeToDoItemsCount = this.toDoItems.filter(({ isCompleted }) => !isCompleted).length;
  }

  onToDoItemsFilterTypeChange(event: Event): void {
    this.filterTypeChange.emit((event.target as HTMLInputElement).value as filterTypes);
  }
}
