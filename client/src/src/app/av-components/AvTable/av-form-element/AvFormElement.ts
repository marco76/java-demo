export class AvFormElement<T> {
  value : T;
  label: string;
  controlType: string;


  constructor(options: {value?: T, label?: string, controlType?: string} = {}) {
    this.value = options.value;
    this.label = options.label;
    this.controlType = options.controlType;
  }
}
