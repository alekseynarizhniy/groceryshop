import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProfDialogComponent } from '../prof-dialog/prof-dialog.component';

import { DIALOG_WIDTH } from 'src/app/constants/values';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent {

  constructor(private dialog: MatDialog) {}

  public onClick(event: any): void {
    this.dialog.open(ProfDialogComponent, {
      width: DIALOG_WIDTH,
    });

    event.target.removeEventListener('click', this.onClick, true);
  }

}
