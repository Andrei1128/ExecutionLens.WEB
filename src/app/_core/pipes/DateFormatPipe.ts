import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'dd/MM/yyyy HH:mm:ss.SSS'): any {
    const datePipe = new DatePipe('en');
    return datePipe.transform(value, format);
  }
}
