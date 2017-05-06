import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplePrettyXML'
})
export class SimplePrettyXML implements PipeTransform{
  transform(val) {
    if (!val) {
      return val
    }

    let convertedAnnotations = val
      .replace(/</g, '&lt')
      .replace(/>/g, '&gt')
    return convertedAnnotations.replace(/&gt&lt/g, '&gt<br>&lt');
  }
}
