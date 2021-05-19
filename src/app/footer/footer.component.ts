import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterTypes } from "../filter-types";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
  })
  export class FooterComponent {
      @Input() count: number;
      @Output() onChange = new EventEmitter<FilterTypes>();

      onRadioChange(event){
        this.onChange.emit(event.target.value);         
      }

  }