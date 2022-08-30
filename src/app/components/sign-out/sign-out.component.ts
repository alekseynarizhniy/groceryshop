import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent {

  constructor(private userService: UserService) {}

  public onClick(event: any): void {
    this.userService.outUserAutorizationStatus();

    event.target.removeEventListener('click', this.onClick, true);
  }
}
