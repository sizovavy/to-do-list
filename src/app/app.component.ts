import { Component } from '@angular/core';
import { FilterTypes } from './filter-types';
import { ListItem } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';
  initialListItemsCount = 0;
  listItems: ListItem[] = [];
  listItemsLeftCount: number = this.initialListItemsCount;
  isListChecked: boolean = false;
  currentFilter: FilterTypes = FilterTypes.All;
  
  listItemAdd(listItem: ListItem){
      this.listItems = [...this.listItems, listItem];
      this.listItemsLeftCount++;
  }

  filterApply(filter: FilterTypes){
      if(filter === FilterTypes.All){
          this.currentFilter = FilterTypes.All;
      }
     
      if(filter === FilterTypes.Active){
          this.currentFilter = FilterTypes.Active;
      }

      if(filter === FilterTypes.Completed){
          this.currentFilter = FilterTypes.Completed;
      }
  }

  onCheckedAllList(){     
    this.isListChecked = !this.isListChecked;
    this.listItemsLeftCount = this.isListChecked ? this.initialListItemsCount : this.listItems.length ;
    let newArray = [];
    this.listItems.forEach((item)=>newArray.push({id:item.id, value:item.value, completed: this.isListChecked}));
    this.listItems = [...newArray];         
  }
}
