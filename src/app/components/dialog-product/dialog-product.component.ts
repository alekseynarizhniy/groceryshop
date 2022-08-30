import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ProductWrapper } from 'src/app/classes/product';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent {
  public keysValues = Object.entries(this.data);

  constructor(
    private dialogProduct: MatDialogRef<DialogProductComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: ProductWrapper
  ) {}

  public addProduct(event: any): void {
    event.stopPropagation();
    this.store.dispatch({ type: 'add', newvalue: this.data });
  }

  public onClose(): void {
    this.dialogProduct.close();
  }
}
