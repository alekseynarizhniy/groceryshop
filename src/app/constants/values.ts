export const DIALOG_WIDTH: string = '500px';

export const REGEX_NAME: string = '[a-zA-Z][a-zA-Z ]+';
export const REGEX_LOGIN: string = '[a-zA-Z0-9][a-zA-Z0-9 ]+';
export const REGEX_PASSWORD: string = '[a-zA-Z0-9][a-zA-Z0-9 ]+';
export const REGEX_EMAIL: string = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
export const REGEX_PHONE: string = '^[0-9]*$';
export const REGEX_ADDRESS: string = '[a-zA-Z0-9.][a-zA-Z0-9. ]+';


export const MIN_SIZE: number = 4;
export const INPUT_NAMES: Record<string, string> = {
  login: 'login',
  password: 'password',
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'address'
};
export const ERROR_VALIDATION: Record<string, any> = {
  login: { name: 'Login', size: '4' },
  password: { name: 'Password', size: '6' },
  name: { name: 'Name', size: '4', get pattern() { return "Only alphabetsallowed." } },
  email: { name: 'Email', get pattern() { return "Incorrect email." } },
  phone: { name: 'Phone', get pattern() { return "Incorrect phone." } },
  address: { name: 'Address', size: '4', get minlength() { return "Address to short." } }
};
