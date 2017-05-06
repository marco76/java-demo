import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyXML'
})
export class PrettyXMLPipe implements PipeTransform{
  transform(val) {
    if (!val) {
      return '';
    }

    let convertedAnnotations = val
      .replace(/<</g, '&lt')
      .replace(/>>/g, '&gt');
    return convertedAnnotations;
  }
}
