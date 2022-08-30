import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMG_CLOSE } from 'src/app/constants/links';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss'],
})
export class SuccessOrderComponent {
  public closeIcon: string = IMG_CLOSE;

  constructor(private dialogBucket: MatDialogRef<SuccessOrderComponent>) {}

  public onClose(): void {
    this.dialogBucket.close();
  }
}
