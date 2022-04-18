import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any, reverse: boolean = false, key: string): any[] {
    if (!value) {
      return value
    }
    const result =  [...value].sort((a: any, b: any) => (a[key] < b[key]) ? 1 : -1);
    if (reverse) {
      return result.reverse()
    }
    return result
  }

}
