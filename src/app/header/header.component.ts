import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../item';

@Component({
  selector: 'to-do-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    @Output() onAdded = new EventEmitter<Item>();
    @Output() onCheckedAll = new EventEmitter<Boolean>();
    
    newItemInput = new FormControl('');
    id: number = 0

    add(event: Event){
        this.onAdded.emit(            
            {   
                id: this.id++,
                value: (event.target as HTMLInputElement).value, 
                completed: false
            }
        );
        this.newItemInput.setValue('');      
    }

    checkAll(){
        this.onCheckedAll.emit(true)        
    }
}