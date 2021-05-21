import { FilterTypes } from './filter-types';
import { Pipe, PipeTransform } from '@angular/core';
import { ListItem } from './item';

@Pipe({
    name: 'showFilteredBy',
    pure: false
})
export class ShowFilteredBy implements PipeTransform {
    
    transform(items: ListItem[], filter: FilterTypes): any { 
        if (!items || !filter) {
            return items;
        }

        if(filter === FilterTypes.All){
            return [...items];
        }
       
        if(filter === FilterTypes.Active){
            return items.filter((it)=> !it.completed);
        }

        if(filter === FilterTypes.Completed){
            return items.filter((it)=> it.completed);
        }
    }
}