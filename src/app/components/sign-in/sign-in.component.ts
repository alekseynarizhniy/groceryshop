import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionLike } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { DialogSignInComponent } from '../dialog-sign-in/dialog-sign-in.component';

import { DIALOG_WIDTH } from '../../constants/values';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  constructor(private dialog: MatDialog) {}

  public onClick(event: any): void {
    this.dialog.open(DialogSignInComponent, {
      width: DIALOG_WIDTH,
    });

    event.target.removeEventListener('click', this.onClick, true);
  }
}
