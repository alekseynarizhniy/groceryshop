import {  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { FormRegistrationComponent } from '../form-registration/form-registration.component';

import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-prof-dialog',
  templateUrl: './prof-dialog.component.html',
  styleUrls: ['./prof-dialog.component.scss']
})
export class ProfDialogComponent implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked {
  private subscriptions: Subscription[] = [];
  private currentUser!: User;

  @ViewChild(FormRegistrationComponent) form!:FormRegistrationComponent;

  constructor(private userService: UserService, private dialogRegistration: MatDialogRef<ProfDialogComponent>, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userSubscription = this.userService
    .getUser()
    .subscribe((user: User) => {
      this.currentUser = user;
    });

    this.subscriptions.push(userSubscription);
  }

  ngAfterViewInit(): void {
    const registrationGroup = this.form.registrationGroup;

    registrationGroup.get('login')?.setValue(this.currentUser.login);
    registrationGroup.get('name')?.setValue(this.currentUser.name);
    registrationGroup.get('password')?.setValue(this.currentUser.password);
    registrationGroup.get('email')?.setValue(this.currentUser.email);
    registrationGroup.get('phone')?.setValue(this.currentUser.phone);
    registrationGroup.get('address')?.setValue(this.currentUser.address);
    registrationGroup.get('login')?.disable();

    const eventUserSubscription = this.form.newItemEvent.subscribe(user => {
        this.userService.updateUser({ ...this.currentUser, ...user });
        this.onClose();
    });

    this.subscriptions.push(eventUserSubscription);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  public onClose(): void {
    this.dialogRegistration.close();
  }

}
