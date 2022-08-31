import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DIALOG_WIDTH } from 'src/app/constants/values';
import { DataService } from 'src/app/services/data.service';

import { GoodsService } from 'src/app/services/goods.service';
import { UserService } from 'src/app/services/user.service';

import { ProductWrapper } from '../../classes/product';

import { SuccessOrderComponent } from '../success-order/success-order.component';

@Component({
  selector: 'app-dialog-bucket',
  templateUrl: './dialog-bucket.component.html',
  styleUrls: ['./dialog-bucket.component.scss'],
})
export class DialogBucketComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'quantity',
    'image',
    'remove',
  ];
  private subscriptions: Subscription[] = [];
  public goods: ProductWrapper[] = [];
  public bucketGoods: ProductWrapper[] = [];

  constructor(
    private dialogBucket: MatDialogRef<DialogBucketComponent>,
    private dataService: DataService,
    private goodsService: GoodsService,
    private userService: UserService,
    private dialog: MatDialog,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    const goodsSubscription = this.goodsService
      .getGoods()
      .subscribe((goods: ProductWrapper[]) => {
        this.goods = goods;
      });

    this.subscriptions.push(goodsSubscription);

    const storeSubscription = this.store
      .select('addGoods')
      .subscribe((goods: ProductWrapper[]) => (this.bucketGoods = goods));

    this.subscriptions.push(storeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public getFullPrice(): Number {
    let fullPrice = 0;

    this.bucketGoods.forEach(
      (item) => (fullPrice += item.price * item.quantity)
    );

    return +fullPrice.toFixed(2);
  }

  public acceptOrder(): void {

    if(this.bucketGoods.length){
      this.bucketGoods.forEach((product: ProductWrapper) => {
        let currentProduct = this.goods[product.id - 1];

        currentProduct.quantity -= product.quantity;

        this.goodsService.updateProduct(currentProduct);
      });

      let currentUser = this.userService.getUser().subscribe((user) => {
        const order = {name: user.name, phone: user.phone, address: user.address, email: user.email,order: this.bucketGoods};
        let sendData = this.dataService.addData('orders', order).subscribe(() => sendData.unsubscribe());
      });

      this.subscriptions.push(currentUser);

      this.clearBucker();

      this.dialog.open(SuccessOrderComponent, {
        width: DIALOG_WIDTH,
      });
    }

    this.onClose();
  }

  public removeProduct(product: ProductWrapper): void {
    this.store.dispatch({ type: 'remove', newvalue: product });
  }

  public clearBucker(): void {
    this.store.dispatch({ type: 'clear', newvalue: {} });
  }

  public onClose(): void {
    this.dialogBucket.close();
  }
}
