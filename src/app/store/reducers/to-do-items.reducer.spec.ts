import { initialToDoItemsState } from '../state/to-do-items.state';
import { toDoItemsReducer } from './to-do-items.reducer';

describe('ToDoItemReducer', () => {
    const action = {
        type: '[ToDoItems] Switch Active ToDoItems To Completed',
      };

    describe('[ToDoItems] Switch Active ToDoItems To Completed action', () => {
      it('should Switch Active ToDoItems To Completed', () => {
        const state = toDoItemsReducer(initialToDoItemsState, action);
   
        expect(state).not.toBe(state);
      });

      it('should Switch Active ToDoItems To Completed', () => {
        const state = toDoItemsReducer(initialToDoItemsState, action);
   
        expect(state).toBe(initialToDoItemsState);
      });
    });
});