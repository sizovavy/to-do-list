import { Component } from "@angular/core";
import { FilterTypes } from "../filter-types";
import { Item } from "../item";

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
  })
  export class ToDoListComponent {
    itemsStore: Item[] = []
    itemsLeft: number = 0
    allChecked: boolean = true
    currentFilter: FilterTypes = FilterTypes.All
    
    add(item: Item){
        this.itemsStore.push(item)
        this.itemsLeft++    
    }


    onChange(event){
        const itemId = this.itemsStore.indexOf(this.itemsStore.find(it => it.id === event.id));

        if(event.deleted){            
            if(!this.itemsStore[itemId].completed) {this.itemsLeft--;}
            this.itemsStore.splice(itemId, 1);

            return;
        }        

        event.completed ? this.itemsLeft--: this.itemsLeft++;
        this.itemsStore[itemId].completed = event.completed;
    }

    filterApplied(filter: FilterTypes){

        if(filter === FilterTypes.All){
            this.currentFilter = FilterTypes.All
        }
       
        if(filter === FilterTypes.Active){
            this.currentFilter = FilterTypes.Active 
        }

        if(filter === FilterTypes.Completed){
            this.currentFilter = FilterTypes.Completed
        }
    }

    checkAll(){        
        this.itemsStore.map(it => it.completed = this.allChecked);
        this.itemsLeft = this.allChecked ? 0 : this.itemsStore.length;   
        this.allChecked = !this.allChecked;    
    }
  }