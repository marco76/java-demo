 export default class Person {

  name: string;
  familyName : string;
  constructor(json : any){
    this.name = json.name;
    this.familyName = json.name;
  }
}
