import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvTableColumnForm } from "../av-form-element/AvTableColumnForm";

@Injectable()
export class AvEditorService {
  constructor() {
  }

  toFormGroup(elements: AvTableColumnForm[]) {
    let group: any = {};

    console.log('elements', elements);

    elements.forEach(element => {
      console.log(element.required);
      group[element.fieldName] = element.required ? new FormControl(element.value || '', Validators.required)
        : new FormControl(element.value || '');
    });
    return new FormGroup(group);
  }
}
