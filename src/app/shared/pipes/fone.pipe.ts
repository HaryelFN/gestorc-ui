import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'fone'
})
export class FonePipe implements PipeTransform {
  transform(phoneValue: number | string, country: string): any {
    try {
      if (phoneValue !== null) {
        const phoneNumber = parsePhoneNumber(phoneValue + '', country as CountryCode);
        return phoneNumber.formatNational();
      }
    } catch (error) {
      return phoneValue;
    }
  }
}
