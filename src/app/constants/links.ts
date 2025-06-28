import { HttpHeaders } from '@angular/common/http';

//export const URL: string = 'http://localhost:3000/';
export const URL: string = 'https://groceryshop-2pco.onrender.com/';

export const EXTRA_URL_GOODS: string = 'goods';
export const EXTRA_URL_USERS: string = 'users';

const HEADER = new HttpHeaders({
  'Content-Type': 'application/json',
});
export const HTTP_OPTINDS = {
  headers: HEADER,
};

export const IMG_BUCKET: string = 'assets/images/bucket.png';
export const IMG_CLOSE: string = 'assets/images/cross-icon.svg';
