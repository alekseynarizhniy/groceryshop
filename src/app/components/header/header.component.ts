import { Component, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public autorization: Boolean = false;
  public autorizationStatus;

  constructor( private userService: UserService) {
      this.autorizationStatus = this.userService
      .getAutorizationStatus()
  }

}
