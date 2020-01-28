import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'number-pipe'
})
export class NumberPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any, args?: any, concat?: string): any {
    return this.decimalPipe.transform(value, args).concat(concat);
  }

}
