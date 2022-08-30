import { ProductWrapper } from '../classes/product';

export interface BucketAction {
  type: string;
  newvalue: ProductWrapper;
}
