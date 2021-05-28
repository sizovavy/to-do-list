import { filterTypes } from './filter-types.enum';

import { ToDoItem, ToDoItems } from './to-do-item.type';

const getAllToDoItems = (toDoItems: ToDoItems): ToDoItems => toDoItems;

const getActiveToDoItems = (toDoItems: ToDoItems): ToDoItems => 
    toDoItems.filter(({ isCompleted }: ToDoItem) => !isCompleted);

const getCompletedToDoItems = (toDoItems: ToDoItems): ToDoItems => 
    toDoItems.filter(({ isCompleted }: ToDoItem) => isCompleted);

export const filteredToDoItems = {
    [filterTypes.all]: getAllToDoItems,
    [filterTypes.active]: getActiveToDoItems,
    [filterTypes.completed]: getCompletedToDoItems,
};