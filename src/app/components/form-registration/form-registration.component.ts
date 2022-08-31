import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../interfaces/users';

import {
  REGEX_ADDRESS,
  REGEX_EMAIL,
  REGEX_LOGIN,
  REGEX_NAME,
  REGEX_PASSWORD,
  REGEX_PHONE,
  MIN_SIZE,
  ERROR_VALIDATION,
  INPUT_NAMES
} from '../../constants/values';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss'],
})
export class FormRegistrationComponent {
  public minSize = MIN_SIZE;
  public inputNames = INPUT_NAMES;
  public erorrValidation = ERROR_VALIDATION;

  public registrationGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_NAME)]],
    login: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_PASSWORD)]],
    password: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_LOGIN)]],
    email: ['', [Validators.required, Validators.pattern(REGEX_EMAIL)]],
    phone: ['', [Validators.pattern(REGEX_PHONE)]],
    address: ['', [Validators.required, Validators.minLength(this.minSize)]]
  });

  public extraMessage: string = '';

  constructor(private fb: FormBuilder) { }

  @Output() newItemEvent = new EventEmitter<User>();

  public originOrder(): number {
    return 0;
  }

  public onSubmit(): void {

    if (this.registrationGroup.valid) {
      const user: User = this.registrationGroup.value as User;
      this.newItemEvent.emit(user);
    }
  }

}
