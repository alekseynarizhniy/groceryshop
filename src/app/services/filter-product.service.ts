import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProductWrapper } from '../classes/product';

@Injectable()
export class FilterProductService {
  private ALL_VALUE: string = 'ALL';
  private CONTAIN: string = 'contain';
  private goods: ProductWrapper[] = [];

  private filterMap: Map<string, any> = new Map();

  private filterSubject: BehaviorSubject<Map<string, any>> =
    new BehaviorSubject(this.filterMap);

  private filteredGoodsKeeper: BehaviorSubject<ProductWrapper[]> =
    new BehaviorSubject<ProductWrapper[]>([]);

  public addGoods(productArr: ProductWrapper[]): void {
    this.goods = productArr;
  }

  public filteredGoods(): Observable<ProductWrapper[]> {
    this.filteredGoodsKeeper.next(this.goods);
    return this.filteredGoodsKeeper.asObservable();
  }

  public addFilter(type: string, value: string) {
    let newFilter = new Map(this.filterMap);

    newFilter.set(type, value);

    this.filterMap.set(type, value);

    this.filterSubject.next(newFilter);

    this.filterGoods();
  }

  private filterGoods() {
    let filters = this.filterSubject.getValue();

    let filteredGoods: ProductWrapper[] = this.goods;

    if (filters.size) {
      for (let item of filters) {
        if (item[1] === this.CONTAIN) {
          filteredGoods = this.filterContain(filteredGoods, item);
        } else {
          filteredGoods = this.filterString(filteredGoods, item);
        }
      }
    }

    this.filteredGoodsKeeper.next(filteredGoods);
  }

  private filterContain(goods: ProductWrapper[], filter: string[]): ProductWrapper[] {
    const newGoods: ProductWrapper[] = [];
    let index: string = filter[0];

    goods.forEach((product) => {
      if (product[index as keyof ProductWrapper]) {
        newGoods.push(product);
      }
    });
    return newGoods;
  }

  private filterString(goods: ProductWrapper[], filter: String[]): ProductWrapper[] {
    let newGoods = [];
    if (filter[1] === this.ALL_VALUE || filter[1].trim() === '') {
      newGoods = goods.slice();
    } else {
      newGoods = goods.filter((val: any) =>
        val[filter[0].toLowerCase()]
          .toUpperCase()
          .includes(filter[1].toUpperCase())
      );
    }
    return newGoods;
  }
}
