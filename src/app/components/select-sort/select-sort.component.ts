import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './select-sort.component.html',
  styleUrls: ['./select-sort.component.scss'],
})
export class SelectSortComponent {
  @Input() listMenu: string[] = [];

  @Input() type: string = '';

  @Input() allValue:Boolean = false;

  @Output() newItemEvent = new EventEmitter<string>();

  onChange(element: any): void {
    this.newItemEvent.emit(element.value);
  }
}
