import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  onSubmit(event: NgForm): void {
    const value:string = event.value.search;
    this.newItemEvent.emit(value);
  }
}
