import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, SubscriptionLike } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { ProductWrapper } from '../../classes/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy{
  public autorization: Boolean = false;
  private subscriptions: Subscription[] = [];
  public goodsArray: ProductWrapper[] = [];


  constructor(private store: Store<any>, private userService: UserService) {
    const storeSubscription = this.store
      .select('addGoods')
      .subscribe((goods: ProductWrapper[]) => {
        this.goodsArray = goods;
      });

      this.subscriptions.push(storeSubscription);

      const autorizationSubscription = this.userService
      .getAutorizationStatus()
      .subscribe((autorizationStatus: boolean) => {
        this.autorization = autorizationStatus;
      });

    this.subscriptions.push(autorizationSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
