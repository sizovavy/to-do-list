import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListItem } from '../item';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    @Output() listItemEntered = new EventEmitter<ListItem>();
    @Output() checkedAllClicked = new EventEmitter<Boolean>();
    
    initialListItemsCount = 0;
    newListItemInput = new FormControl('');
    id: number = this.initialListItemsCount;

    listItemAdd(event: Event){
        this.listItemEntered.emit(            
            {   
                id: this.id++,
                value: (event.target as HTMLInputElement).value, 
                completed: false
            }
        );
        this.newListItemInput.setValue('');      
    }

    checkAll(){
        this.checkedAllClicked.emit();
    }
}