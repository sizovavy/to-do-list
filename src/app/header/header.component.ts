import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import { initialFormControlInputValue } from '../constants';

import { AppState } from '../store/state/app.state';

import { createToDoItem, switchActiveToDoItemsToCompleted } from '../store/actions/to-do-items.action';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private readonly store: Store<AppState>) {}
    
  createToDoItemControl = new FormControl(initialFormControlInputValue);

  createToDoItem(value: string): void {
    this.store.dispatch(createToDoItem({
          value,
          id: Date.now(),      
          isCompleted: false,
    }))

    this.createToDoItemControl.setValue(initialFormControlInputValue);
  }

  switchActiveToDoItemsToCompleted(): void {
    this.store.dispatch(switchActiveToDoItemsToCompleted());
  }
}
