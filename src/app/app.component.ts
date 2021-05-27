import { Component } from '@angular/core';

import { title } from './constants';
import { Store } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = title;

  counterReducer(state = { value: 0 }, action) {
    if(!action) {
      return state;
    }

    switch (action.type) {
      case 'counter/incremented':
        return { ...state, value: state.value + 1 }
      case 'counter/decremented':
        return { ...state, value: state.value - 1 }
      default:
        return state
    }
  }

  store = new Store(this.counterReducer);
  currentState = this.store.getState().value;

  subscription1 = this.store.subscribe((state) => console.log(state.value));
  subscription2;

  increment() {
    this.store.dispatch({ type: 'counter/incremented' });
    this.currentState = this.store.getState().value;
  }
  
  decrement() {
    this.store.dispatch({ type: 'counter/decremented' });
    this.currentState = this.store.getState().value;
  }

  unsubscribe() {
    this.subscription2();
  }

  subscribe() {    
    this.subscription2 = this.store.subscribe((state) => console.log(state.value * 2));
  }
  
  
}
