import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoItems } from './to-do-item';

@Injectable({ providedIn: 'root' })
export class ToDoListService {
    private subject = new BehaviorSubject<ToDoItems>([]);    

    setToDoList(toDoItems: ToDoItems) {
        this.subject.next(toDoItems);
    }
    
    onToDoList(): BehaviorSubject<ToDoItems> {
        return this.subject;
    }
}