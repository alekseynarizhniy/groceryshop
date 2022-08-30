import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { RegistrDialogComponent } from '../registr-dialog/registr-dialog.component';

import { DIALOG_WIDTH } from '../../constants/values';

@Component({
  selector: 'app-dialog-sign-in',
  templateUrl: './dialog-sign-in.component.html',
  styleUrls: ['./dialog-sign-in.component.scss'],
})
export class DialogSignInComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogSignInComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  public onSubmit(form: NgForm): void {
    const value = form.value;

    if (value.login.length && value.password.length) {
      const userCheck = this.userService
        .checkUser(value.login, value.password)
        .subscribe((val: Boolean) => {
          if (val) {
            this.errorMessage = '';
            this.onClose();
          } else {
            this.errorMessage = 'wrong login or password';
          }
        });

      this.subscriptions.push(userCheck);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onRegistrate(): void {
    this.dialogRef.close();

    this.dialog.open(RegistrDialogComponent, {
      width: DIALOG_WIDTH,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
