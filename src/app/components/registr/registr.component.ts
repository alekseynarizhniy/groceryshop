import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RegistrDialogComponent } from '../registr-dialog/registr-dialog.component';

import { DIALOG_WIDTH } from 'src/app/constants/values';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent {

  constructor(private dialog: MatDialog) {}

  public onClick(event: any): void {
    this.dialog.open(RegistrDialogComponent, {
      width: DIALOG_WIDTH,
    });

    event.target.removeEventListener('click', this.onClick, true);
  }

}
