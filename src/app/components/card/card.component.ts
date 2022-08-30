import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductWrapper } from '../../classes/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private goodsFromStore: number = 0;

  @Input() product!: ProductWrapper;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('addGoods').subscribe((goods: ProductWrapper[]) => {
      let product = goods.find(
        (product: ProductWrapper) => product.name === this.product.name
      );

      if (product) {
        this.goodsFromStore = product.quantity;
      } else {
        this.goodsFromStore = 0;
      }
    });
  }

  public addProduct(event: any) {
    event.stopPropagation();

    if (this.goodsFromStore < this.product.quantity) {
      let currentPruduct: ProductWrapper = Object.assign({}, this.product);
      currentPruduct.quantity = 1;

      this.store.dispatch({ type: 'add', newvalue: currentPruduct });
    }

    event.target.removeEventListener('click', this.addProduct, true);
  }
}
