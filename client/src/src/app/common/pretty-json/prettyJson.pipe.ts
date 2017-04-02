import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform{
  transform(val) {
    if (!val) {
      return '';
    }
    if (typeof(val) === 'string') {
      val = JSON.parse(val);
    }

    return JSON.stringify(val, null, 2)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');
  }
}
