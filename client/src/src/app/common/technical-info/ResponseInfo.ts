export default class ResponseInfo {

  private _status : number = 200;
  private _text : string = '';
  private _error : boolean = false;

  constructor() {

  }

  get status(): number {
    return this._status;
  }

  set status(status: number) {
    this._status = status;
  }

  get text(): string {
    return this._text;
  }

  set text(text: string) {
    this._text = text;
  }

  set error(error: boolean) {
    this._error = error;
  }

  get error() {
    return this._error;
  }
}
