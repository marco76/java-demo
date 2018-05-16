import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AvAutocompleteItem } from  '@molteni/av-components';


@Component({
  selector: 'app-av-example',
  templateUrl: './av-example.component.html',
  styleUrls: ['./av-example.component.css']
})
export class AvExampleComponent {

  @Output() onselecteditem: EventEmitter<AvAutocompleteItem> = new EventEmitter<AvAutocompleteItem>();

  autocompleteItemList : Array<AvAutocompleteItem>;
  selectable: Array<AvAutocompleteItem>;
  selectableDynamic: Array<AvAutocompleteItem>;
  simpleSelected : AvAutocompleteItem;
  dynamicSelected: AvAutocompleteItem;

  constructor(){
    this.autocompleteItemList = new Array<AvAutocompleteItem>();
    this.autocompleteItemList.push(new AvAutocompleteItem('aaa', '1'));
    this.autocompleteItemList.push(new AvAutocompleteItem('aab', '2'));
    this.autocompleteItemList.push(new AvAutocompleteItem('aac', '3', {type : 'object'}));
  }


  getSelectableObjects(input : string) {
    let result = Array<AvAutocompleteItem>();
    this.selectable = this.autocompleteItemList;

  }

  onTextChanged(text: string) {
    this.getSelectableObjects(text);
  }

  onTextChangedDynamic(text: string) {
    this.selectableDynamic = new Array<AvAutocompleteItem>();
    for (let i= 1; i<=10; i++) {
      this.selectableDynamic.push(new AvAutocompleteItem( text + ' ' + i, i, {value: text, id : i}));
    }



  }

  onSelected(item: AvAutocompleteItem) {
    this.simpleSelected = item;
    this.onselecteditem.emit(item);
  }

  onDynamicSelected(item: AvAutocompleteItem) {
    this.dynamicSelected = item;
    this.onselecteditem.emit(item);
  }

  getJSON(item: AvAutocompleteItem) {
    return JSON.stringify(item);
  }

}
