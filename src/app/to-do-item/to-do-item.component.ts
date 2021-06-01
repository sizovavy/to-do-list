import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.state';

import { changeToDoItemCompletedStatus, deleteToDoItem } from '../store/actions/to-do-items.action';

import { ToDoItem } from '../to-do-item.type';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
  @Input() toDoItem: ToDoItem;

  constructor(private readonly store: Store<AppState>) {}

  deleteToDoItem(): void {
    this.store.dispatch(deleteToDoItem({ id: this.toDoItem.id }));
  }

  changeToDoItemCompletedStatus(): void {
    this.store.dispatch(changeToDoItemCompletedStatus({ id: this.toDoItem.id }));
  }
}
