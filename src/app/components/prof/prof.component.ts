import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { ProfDialogComponent } from '../prof-dialog/prof-dialog.component';

import { DIALOG_WIDTH } from 'src/app/constants/values';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
  public name?: Observable<string>;

  constructor(private dialog: MatDialog, private  userService: UserService) {}

  ngOnInit(): void {
    this.name = this.userService.getUser().pipe( map(user => user.name));
  }

  public onClick(event: any): void {
    this.dialog.open(ProfDialogComponent, {
      width: DIALOG_WIDTH,
    });

    event.target.removeEventListener('click', this.onClick, true);
  }

}
