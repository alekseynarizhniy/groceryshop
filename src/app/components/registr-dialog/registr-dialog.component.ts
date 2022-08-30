import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { FormRegistrationComponent } from '../form-registration/form-registration.component';

@Component({
  selector: 'app-registr-dialog',
  templateUrl: './registr-dialog.component.html',
  styleUrls: ['./registr-dialog.component.scss'],
})
export class RegistrDialogComponent implements AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @ViewChild(FormRegistrationComponent) form!: FormRegistrationComponent;

  constructor(
    private userService: UserService,
    private dialogRegistration: MatDialogRef<RegistrDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    const eventUserSubscription = this.form.newItemEvent.subscribe((user) => {
      const userLogin = user.login;

      let userLoginSubscription = this.userService
        .checkLogin(userLogin)
        .subscribe((val) => {
          if (!val) {
            this.userService.addNewUser(user);
            this.onClose();
          } else {
            this.form.extraMessage = 'Login exist, try another';
          }
        });

      this.subscriptions.push(userLoginSubscription);
    });

    this.subscriptions.push(eventUserSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onClose(): void {
    this.dialogRegistration.close();
  }
}
