import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductWrapper } from '../classes/product';

import { DialogProductComponent } from '../components/dialog-product/dialog-product.component';

import { DIALOG_WIDTH } from '../constants/values';

@Directive({
  selector: '[dialogProduct]',
})
export class DialogProductDirective {
  @Input() dialogProduct!: ProductWrapper;

  @HostListener('click', ['$event']) onClick(event: any): void {
    this.dialog.open(DialogProductComponent, {
      width: DIALOG_WIDTH,
      data: this.dialogProduct,
    });

    event.target.removeEventListener('click', this.onClick);
  }

  constructor(private dialog: MatDialog) {}
}
