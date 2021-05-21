import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterTypes } from "../filter-types";

@Component({
    selector: 'to-do-footer',
    templateUrl: './footer.component.html',
  })
  export class FooterComponent {
      @Input() listItemsLeftCount: number;
      @Output() filterChanged = new EventEmitter<FilterTypes>();

      onRadioChange(event){
        this.filterChanged.emit(event.target.value);         
      }

  }