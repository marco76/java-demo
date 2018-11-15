import {AvFormElement} from "./AvFormElement";

export class AvFormText extends AvFormElement<string> {
  controlType= 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
