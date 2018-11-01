export class AVTableActions {

  private _editableRecord : boolean = true;
  private _deletableRecord : boolean = true;
  private _addRecord : boolean = true;

  constructor(addRecord?: boolean, editableRecord?: boolean, deletableRecord? : boolean) {

    if (addRecord !== undefined) {
      this._addRecord = addRecord;
    }

    if (editableRecord !== undefined) {
      this._editableRecord = editableRecord;
    }

    if (deletableRecord !== undefined) {
      this._deletableRecord = deletableRecord;
    }
  }

  get editableRecord(): boolean {
    return this._editableRecord;
  }

  set editableRecord(value: boolean) {
    this._editableRecord = value;
  }

  get deletableRecord(): boolean {
    return this._deletableRecord;
  }

  set deletableRecord(value: boolean) {
    this._deletableRecord = value;
  }

  get addRecord(): boolean {
    return this._addRecord;
  }

  set addRecord(value: boolean) {
    this._addRecord = value;
  }
}
