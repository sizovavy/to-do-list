import { ToDoItem } from 'src/app/to-do-item.type';
import { changeToDoItemCompletedStatus, clearCompletedToDoItems, createToDoItem, deleteToDoItem, switchActiveToDoItemsToCompleted } from '../actions/to-do-items.action';
import { initialToDoItemsState } from '../state/to-do-items.state';
import { toDoItemsReducer } from './to-do-items.reducer';

describe('ToDoItemReducer', () => {
    it('should return the default state', () => {
        const action = {
            type: "unknown"
        };
        const state = toDoItemsReducer(undefined, action);

        expect(state).toBe(initialToDoItemsState);
    });

    const state = {
        toDoItems: [
                        {
                id: 1,
                value: "test1",
                isCompleted: true
            },
            {
                id: 2,
                value: "test2",
                isCompleted: true
            },
            {
                id: 3,
                value: "test3",
                isCompleted: false
            }
        ],
    }

    describe('[ToDoItems] Switch Active ToDoItems To Completed action ', () => {
        const action = switchActiveToDoItemsToCompleted();

        it('should change state if state is not empty', () => {
            const newState = toDoItemsReducer(state, action);

            expect(newState).not.toEqual(state);
        });

        it('should not change state if state is empty', () => {
            const newState = toDoItemsReducer(initialToDoItemsState, action);

            expect(newState).toEqual(initialToDoItemsState);
        });
    });

    describe('[ToDoItems] Create ToDoItem ', () => {
        const toDoItem: ToDoItem = {
            id: 0,
            value: "test0",
            isCompleted: false
        }
        const action = createToDoItem(toDoItem);

        it('should set state.length to 1 if state is empty', () => {
            const newState = toDoItemsReducer(initialToDoItemsState, action);
    
            expect(newState.toDoItems.length).toBe(1);
        });

        it('state should contains new item', () => {
            const newState = toDoItemsReducer(initialToDoItemsState, action);
    console.log(newState)
            expect(newState.toDoItems).toContain(toDoItem);
        });

        it('should increment state.length if state is not empty', () => {
            const newStateLen = toDoItemsReducer(state, action).toDoItems.length;
                        
            expect(newStateLen).toBe(state.toDoItems.length + 1);            
        });
    });

    describe('[ToDoItems] Delete ToDoItem', () => {
        const action = deleteToDoItem({ id: 1 });

        it('should change state if state is not empty', () => {
          const newState = toDoItemsReducer(state, action);
  
          expect(newState).not.toEqual(state);
        });
  
        it('should not change state if state is empty', () => {
          const newState = toDoItemsReducer(initialToDoItemsState, action);
  
          expect(newState).toEqual(initialToDoItemsState);
        });

        it('should decrement state.length if state is not empty', () => {
            const newStateLen = toDoItemsReducer(state, action).toDoItems.length;
            
            expect(newStateLen).toBe(state.toDoItems.length - 1);
        });
    });

    describe('[ToDoItems] Change ToDoItem Completed Status', () => {
        const action = changeToDoItemCompletedStatus({ id: 1 });

        it('should change state if state is not empty', () => {
          const newState = toDoItemsReducer(state, action);
  
          expect(newState).not.toEqual(state);
        });
  
        it('should not change state if state is empty', () => {
          const newState = toDoItemsReducer(initialToDoItemsState, action);
  
          expect(newState).toEqual(initialToDoItemsState);
        });
    });

    describe('[ToDoItems] Clear Completed ToDoItems', () => {
        const action = clearCompletedToDoItems();

        const stateWithCompleted = {
            toDoItems: [
                            {
                    id: 1,
                    value: "test1",
                    isCompleted: true
                },
                {
                    id: 2,
                    value: "test2",
                    isCompleted: true
                },
                {
                    id: 3,
                    value: "test3",
                    isCompleted: false
                }
            ],
        }

        const stateWithoutCompleted = {
            toDoItems: [
                            {
                    id: 1,
                    value: "test1",
                    isCompleted: false
                },
                {
                    id: 2,
                    value: "test2",
                    isCompleted: false
                },
                {
                    id: 3,
                    value: "test3",
                    isCompleted: false
                }
            ],
        }

        it('should change state if completed items are present', () => {
          const newState = toDoItemsReducer(stateWithCompleted, action);
  
          expect(newState).not.toEqual(stateWithCompleted);
        });

        it('should not change state if completed items are not present', () => {
            const newState = toDoItemsReducer(stateWithoutCompleted, action);
    
            expect(newState).toEqual(stateWithoutCompleted);
          });
  
        it('should not change state if state is empty', () => {
          const newState = toDoItemsReducer(initialToDoItemsState, action);
  
          expect(newState).toEqual(initialToDoItemsState);
        });
    });
});