import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyXML'
})
export class PrettyXMLPipe implements PipeTransform{
  transform(val) {
    if (!val) {
      return '';
    }

    /*
    let prepareText = val
      .replace('<pre>', '__pre___')
      .replace('</pre>', '__/pre__')
      .replace('<code class="java highlight">', '__code class="java highlight"__')
      .replace('</code>', '_code_end_')
     ;
    let convertedAnnotations = val
      .replace(/<</g, '&lt')
      .replace(/>>/g, '&gt');
     */
    let convertedAnnotations = val
      .replace(/<</g, '&lt')
      .replace(/>>/g, '&gt');
    /*
    let final = convertedAnnotations
      .replace('_pre_', '<pre>' )
      .replace('_/pre_', '</pre>' )
      .replace('_code_begin_', '<code class="java highlight">')
      .replace('_code_end_', '<code>')
    ;*/console.log(convertedAnnotations);
    return convertedAnnotations;
  }
}
