import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";

export class AvTableColumnForm implements AvTableColumnConfig {

   editable?: boolean;
   fieldName: string;
   label?: string;
   required?: boolean = false;
   status?: string;
   value? : string;

  constructor(fieldName: string, editable?: boolean,  label?: string, required?: boolean, status?: string, value?: string) {
    this.editable = editable;
    this.fieldName = fieldName;
    this.label = label;
    this.required = required;
    this.status = status;
    this.value = value;
  }
}
