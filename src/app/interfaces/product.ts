type grownOn = 'root' | 'berry';

export interface SaleProducts{
    [key:string]:string;
}

export interface Product {
  name: string;
  type: string;
  quantity: number;
  weight: number;
  price: number;
  sale?: SaleProducts;
  description: string;
  country: string;
  filename: string;
  id:number;
  grownOn?: grownOn;
}

export interface ProductAbstarct extends Product {
  getCost: (quntity: number) => number;
}
