import { Component, EventEmitter, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../interfaces/users';

import {
  REGEX_ADDRESS,
  REGEX_EMAIL,
  REGEX_LOGIN,
  REGEX_NAME,
  REGEX_PASSWORD,
  REGEX_PHONE,
} from '../../constants/values';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss'],
})
export class FormRegistrationComponent {
  private minSize: number = 4;
  public errorLogin = {name: 'Login', size: '4'};
  public errorPassword = {name: 'Password', size: '6'};
  public errorName = {name: 'Name', size: '4', get pattern () {  return "Only alphabetsallowed."} };
  public errorEmail= {name: 'Email', get pattern () {  return "Incorrect email."} };
  public errorPhone = {name: 'Phone', get pattern () {  return "Incorrect phone."} };
  public errorAddress = {name: 'Address', size: '4', get minlength () {  return "Address to short."}};

  private userNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minSize),
    Validators.pattern(REGEX_NAME),
  ]);
  private loginControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minSize),
    Validators.pattern(REGEX_PASSWORD),
  ]);
  private passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minSize),
    Validators.pattern(REGEX_LOGIN),
  ]);
  private emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern(REGEX_EMAIL),
  ]);
  private phoneControl = new FormControl('',);
  private addressControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minSize),
  ]);
  public registrationGroup = new FormGroup({
    name: this.userNameControl,
    login: this.loginControl,
    password: this.passwordControl,
    email: this.emailControl,
    phone: this.phoneControl,
    address: this.addressControl,
  });

  public extraMessage: string = '';

  @Output() newItemEvent = new EventEmitter<User>();

  public onSubmit(): void {

    if (this.registrationGroup.valid) {
      const user: User = this.registrationGroup.value as User;
      this.newItemEvent.emit(user);
    }
  }

}
