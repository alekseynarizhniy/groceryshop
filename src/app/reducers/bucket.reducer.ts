import { ProductWrapper } from '../classes/product';
import { BucketAction } from '../interfaces/bucket-action';

export function bucket(state: ProductWrapper[] = [], action: BucketAction): ProductWrapper[] {
  let arr: any[] = [];
  arr = state.slice();

  if (action.type === 'add') {
    const productName = action.newvalue.name;
    const index = state.findIndex((product) => product.name === productName);

    if (index < 0) {
      arr.push(action.newvalue);
    } else {
      arr[index] = { ...arr[index], quantity: arr[index].quantity + 1 };
    }
  } else if (action.type === 'remove') {
    const productName = action.newvalue.name;
    const index = state.findIndex((product) => product.name === productName);
    arr.splice(index, 1);
  } else if (action.type === 'clear') {
    arr = [];
  }

  return arr;
}
