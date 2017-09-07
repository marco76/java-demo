import { Component, OnInit } from '@angular/core';
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';
import {DocumentationService} from "../documentation/documentation.service";

@Component({
  selector: 'app-flatmap',
  templateUrl: './flatmap.component.html',
  styleUrls: ['./flatmap.component.css'],
  providers: [DocumentationService]
})
export class FlatmapComponent implements OnInit {

  code :string = "";
  textData: string[]  = [];
  resultDataTable = [{"name":""}];
  resultDataTableFields = new Set();
  formatError=false;

  originalJSON  =
  '[{"name":"Marco", "familyName":"Molteni"},{"name":"Will", "familyName":"Smith"}]';
  userJSON : string;
  markdown: string;
  documentSource : string;



  constructor(private documentationService : DocumentationService) {

  }
  ngOnInit() {
    this.userJSON = this.originalJSON;
    let gitDocument = 'rxjs-json-example-1';
    this.documentSource = `${environment.GIT_DOCUMENTS_URL}${gitDocument}.md`;
    this.documentationService.getDocumentFromServer(gitDocument)
      .subscribe(result => {
            this.markdown = result
      });
  }

  onSubmit() {
    this.formatError=false;

   try {

     this.resultDataTable = [];
     this.resultDataTableFields = new Set();
     Observable.of(JSON.parse(this.userJSON))
       .flatMap(result => result)
       .subscribe(data => this.addDataToTable(data));

   } catch (err) {
     this.formatError=true;
   }

  }

  onReset() {
    this.formatError = false;
    this.resultDataTable = [];
    this.resultDataTableFields = new Set();
    this.userJSON = this.originalJSON;
  }

  addDataToTable(result: any) {

    Object.keys(result).map(result =>this.resultDataTableFields.add(result));
    this.resultDataTable.push(result);

  }
}
