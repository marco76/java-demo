export default class Conference {

  private _title : string;
  private _country : string;
  private _city : string;
  private _begin : Date;
  private _end : Date;
  private _cfp : Date;
  private _languages: string;
  private _daysLeft : number;

  constructor() {

  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }


  get begin(): Date {
    return this._begin;
  }

  set begin(value: Date) {
    this._begin = value;
  }

  get end(): Date {
    return this._end;
  }

  set end(value: Date) {
    this._end = value;
  }

  get cfp(): Date {
    return this._cfp;
  }

  set cfp(value: Date) {
    this._cfp = value;
  }

  get languages(): string {
    return this._languages;
  }

  set languages(value: string) {
    this._languages = value;
  }

  get daysLeft(): number {
    return this._daysLeft;
  }

  set daysLeft(value: number) {
    this._daysLeft = value;
  }
}
