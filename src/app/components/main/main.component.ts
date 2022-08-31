import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionLike, map } from 'rxjs';

import { FilterProductService } from 'src/app/services/filter-product.service';
import { GoodsService } from 'src/app/services/goods.service';
import { SortProductService } from 'src/app/services/sort-product.service';

import { ProductWrapper } from '../../classes/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public country = 'Country';
  public typeProduct = 'Type';
  public sort = 'Sort';
  public sortAZ: string = 'Sort From A to Z';
  public sortZA: string = 'Sort From Z to A';
  public sortProduct = [this.sortAZ, this.sortZA];
  public goodsLength: number = 0;
  public pageSize: number = 5;
  private subscription!: SubscriptionLike;
  public goods: ProductWrapper[] = [];
  public countries: string[] = [];
  public types: string[] = [];
  public filteredGoods: ProductWrapper[] = [];
  public showGoods: ProductWrapper[] = [];

  @ViewChild('paginator') paginator!: MatPaginator

  constructor(
    private productFilter: FilterProductService,
    private productSort: SortProductService,
    private goodsService: GoodsService
  ) { }


  ngOnInit(): void {
    this.subscription = this.goodsService.getGoods().pipe(
      map(resolve => {
        let setCountries = new Set<string>();
        let setTypes = new Set<string>();
        let goods: ProductWrapper[] = [];

        resolve.forEach((product) => {
          setCountries.add(product.country);
          setTypes.add(product.type);
          goods.push(new ProductWrapper(product));
        });

        return { goods: goods, countries: Array.from(setCountries), types: Array.from(setTypes) };
      })

    ).subscribe(object => {
      this.types = object.types;
      this.countries = object.countries;
      this.goods = object.goods

      this.productFilter.addGoods(object.goods);
      this.productFilter.filteredGoods().subscribe(goods => {
        this.filteredGoods = goods;
        this.goodsLength = this.filteredGoods.length;
        this.showGoods = this.filteredGoods.slice(0, this.pageSize);
        if (this.paginator) this.paginator.firstPage();
      });

    });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filterElement(type: string, value: string): void {
    this.productFilter.addFilter(type, value);
  }

  public sortElement(event: any): void {

    if (event === this.sortAZ) {
      this.filteredGoods = this.productSort.sortNameAZ(this.filteredGoods);
    } else if (event === this.sortZA) {
      this.filteredGoods = this.productSort.sortNameZA(this.filteredGoods);
    }

    this.showGoods = this.filteredGoods.slice(0, this.pageSize);
    this.paginator.firstPage();
  }

  public checkSales(event: any) {
    if (event.checked) {
      this.filterElement('sale', 'contain');
    } else {
      this.filterElement('sale', '');
    }
  }

  public changePage(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    let lastIndex = startIndex + event.pageSize;

    this.pageSize = event.pageSize;

    if (lastIndex > this.goodsLength) lastIndex = this.goodsLength;

    this.showGoods = this.filteredGoods.slice(startIndex, lastIndex);
  }
}
