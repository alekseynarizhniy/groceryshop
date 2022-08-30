import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, SubscriptionLike } from 'rxjs';

import { DataService } from './data.service';

import { ProductWrapper } from '../classes/product';

import { EXTRA_URL_GOODS } from '../constants/links';

@Injectable()
export class GoodsService {
  private goods: BehaviorSubject<ProductWrapper[]> = new BehaviorSubject<ProductWrapper[]>([]);

  constructor(private data: DataService) {}

  public getGoodsServer(): void {
    let subscription: SubscriptionLike = this.data
      .getData(EXTRA_URL_GOODS)
      .subscribe((products) => {
        this.goods.next(products);
        subscription.unsubscribe();
      });
  }

  public getGoods(): Observable<ProductWrapper[]> {
    return this.goods.asObservable();
  }

  public updateProduct(updatedProduct: ProductWrapper): void {
    const oldGoods = this.goods.getValue();
    const currenProduct = oldGoods[updatedProduct.id - 1];
    currenProduct.quantity = updatedProduct.quantity;
    this.goods.next(oldGoods);

    let subscribe: SubscriptionLike = this.data
      .updateData(EXTRA_URL_GOODS + '/' + updatedProduct.id, {
        ...updatedProduct,
        quantity: updatedProduct.quantity,
      })
      .subscribe((res) => subscribe.unsubscribe());
  }
}
