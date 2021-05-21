import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterTypes } from "../filter-types";
import { ListItem } from "../item";

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
  })
  export class ToDoListComponent {
    @Input() listItems: ListItem[];
    @Input() listItemsLeftCount: number;
    @Input() currentFilter: FilterTypes = FilterTypes.All;

    @Output() listItemsChange = new EventEmitter<ListItem[]>();
    @Output() listItemsLeftCountChange = new EventEmitter<number>();   


    onStateChange(event: ListItem){ 
        const diffCount = 1;   
                      
        if(!event.value){
            this.listItemsChange.emit(this.listItems.filter((item) => item.id !== event.id));
            this.listItemsLeftCount = event.completed ? this.listItemsLeftCount : this.listItemsLeftCount - diffCount;
            this.listItemsLeftCountChange.emit(this.listItemsLeftCount);

            return;
        }

        const itemIndex = this.listItems.findIndex((item) => item.id === event.id );
        let newListItems = [...this.listItems];
        newListItems[itemIndex] = {...newListItems[itemIndex], completed: event.completed};
        this.listItemsLeftCount = event.completed ? this.listItemsLeftCount - diffCount : this.listItemsLeftCount + diffCount;
        this.listItemsChange.emit(newListItems);
        this.listItemsLeftCountChange.emit(this.listItemsLeftCount);
    }
  }