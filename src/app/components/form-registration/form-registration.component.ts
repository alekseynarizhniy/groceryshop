import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss'],
})
export class FormRegistrationComponent implements OnInit, OnDestroy {
  public minSize = MIN_SIZE;
  public inputNames = INPUT_NAMES;
  public erorrValidation = ERROR_VALIDATION;
  private subscription!: SubscriptionLike;
  public registrationGroup!: FormGroup;
  public extraMessage: string = '';

  @Output() newItemEvent = new EventEmitter<User>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.registrationGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_NAME)]],
      login: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_PASSWORD)]],
      password: ['', [Validators.required, Validators.minLength(this.minSize), Validators.pattern(REGEX_LOGIN)]],
      email: ['', [Validators.required, Validators.pattern(REGEX_EMAIL)]],
      phone: ['', [Validators.pattern(REGEX_PHONE)]],
      address: ['', [Validators.required, Validators.minLength(this.minSize)]]
    });

    this.subscription = this.registrationGroup.get('login')!.valueChanges.subscribe(value => {
      this.extraMessage = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get login() {
    return this.registrationGroup.get('login');
  }

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
