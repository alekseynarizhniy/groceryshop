import { Product, SaleProducts, ProductAbstarct } from '../interfaces/product';

export class ProductWrapper implements ProductAbstarct {
  name: string;
  type: string;
  grownOn: any;
  quantity: number;
  weight: number;
  price: number;
  description: string;
  country: string;
  filename: string;
  id: number;
  sale?: SaleProducts;

  constructor(obj: Product) {
    this.name = obj.name;
    this.type = obj.type;
    this.grownOn = obj.grownOn ? obj.grownOn : 'berry';
    this.quantity = obj.quantity;
    this.weight = obj.weight;
    this.price = obj.price;
    if(obj.sale) this.sale = obj.sale;
    this.description = obj.description;
    this.country = obj.country;
    this.filename = obj.filename;
    this.id = obj.id;
  }

  getCost(quntityBuy: number): number {
    if (quntityBuy > this.quantity) throw new Error('Not enough goods');

    return this.price * quntityBuy;
  }
}
