import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { DialogBucketComponent } from '../dialog-bucket/dialog-bucket.component';
import { DialogSignInComponent } from '../dialog-sign-in/dialog-sign-in.component';

import { ProductWrapper } from 'src/app/classes/product';

import { IMG_BUCKET } from '../../constants/links';
import { DIALOG_WIDTH } from '../../constants/values';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
})
export class BucketComponent implements OnInit, OnDestroy {
  public bucket = IMG_BUCKET;
  public autorization: Boolean = false;
  private subscriptions: Subscription[] = [];
  public itemBucket: ProductWrapper[] = [];

  constructor(private dialog: MatDialog, private useAuthorization: UserService, private store: Store<any>) { }

  ngOnInit(): void {
    const useAuthorization = this.useAuthorization
      .getAutorizationStatus()
      .subscribe((autorizationStaus: Boolean) => {
        this.autorization = autorizationStaus;
      });

    this.subscriptions.push(useAuthorization);

    const storeSubscription = this.store
      .select('addGoods')
      .subscribe((goods: ProductWrapper[]) => {
        this.itemBucket = goods;
      });

    this.subscriptions.push(storeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onClick(event: any): void {
    if (this.autorization) {
      this.dialog.open(DialogBucketComponent, {
        width: DIALOG_WIDTH,
        maxHeight: DIALOG_WIDTH
      });
    } else {
      this.dialog.open(DialogSignInComponent, {
        width: DIALOG_WIDTH,
      });
    }

    event.target.removeEventListener('click', this.onClick, true);
  }
}
