import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'formatStats'
})
export class FormatStatsPipe implements PipeTransform {

  transform(data: any, ...args: unknown[]): any {
    const datePipe = new DatePipe('en');
    const categories = [...new Set(Array.from(data, (d: any) => d.value))].sort(
        (a: Date, b: Date) => (new Date(a).getTime() < new Date(b).getTime()) ? -1 : 1)
    return Array.from(categories, category => (
      {
        name: datePipe.transform(category, 'mediumDate', 'utc'),
        series: Array.from(
          data.filter((y: any) => y.value === category), (x: any) => ({name: 'distance', value: x.count}))
      }
    ))  }

}
