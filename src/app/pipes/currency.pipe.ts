import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value: any, type: string): String {
    return value + ' ' + type;
  }
}
