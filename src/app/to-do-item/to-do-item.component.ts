import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.state';

import { ChangeToDoItemCompletedStatus, DeleteToDoItem } from '../store/actions/to-do-items.action';

import { toDoItemActionTypes } from './../to-do-item-action.enum';

import { ToDoItem } from '../to-do-item.type';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
})
export class ToDoItemComponent {
  @Input() toDoItem: ToDoItem;

  readonly toDoItemActionTypes = toDoItemActionTypes;

  constructor(private readonly store: Store<AppState>) {}

  deleteToDoItem(): void {
    this.store.dispatch(DeleteToDoItem(this.toDoItem))
  }

  changeToDoItemCompletedStatus(): void {
    this.store.dispatch(ChangeToDoItemCompletedStatus(this.toDoItem))
  }
}
