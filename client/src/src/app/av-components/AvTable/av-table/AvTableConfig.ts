import {AvTableColumnConfig} from "./AvTableColumnConfig";
import {AVTableActions} from "./AVTableActions";

export class AvTableConfig {

  columnDefinition : Array<AvTableColumnConfig>;
  tableActions : AVTableActions = new AVTableActions();

  constructor(columnDefinition: Array<AvTableColumnConfig>) {
    this.columnDefinition = columnDefinition;
  }
}
