import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  onSubmit(element: NgForm): void {
    const value:string = element.value.search;
    this.newItemEvent.emit(value);
  }
}
