import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstToUppercase' })
export class FirstToUppercase implements PipeTransform {
  transform(value: string, ...args: any[]): String {
    return value[0].toUpperCase() + value.slice(1);
  }
}
