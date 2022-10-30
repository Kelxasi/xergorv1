import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { debounceTime, filter, Subscription } from 'rxjs';

import { Action, AutoCompleteText, Column, ColumnType, DirtyData, DropDown, TableConfig } from './nsgrid.model';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component'; 
import { CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ns-grid',
  templateUrl: './nsgrid.component.html',
  styleUrls: ['./nsgrid.component.scss']
})
export class NSgridComponent {

  //Data Source
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  
  //Data Columns
  @Input() set column(data: Array<Column>) {
    this.initColumnMetaData(data);
  }
  //Data konfigürasyo nayarları
  @Input() set config(data: TableConfig) {
    this.initTableConfig(data);
  }

  //Güncellenen satırlar
  @Input() set updateRow(data: any) {
    this.updateSelectedRow(data);
  }

  //Silinen satırlar
  @Input() set deletedRow(data: any) {
    this.deleteSelectedRow(data);
  }
  //OutoComple öndeğer data
  @Input() set updateAutoComplete(data: AutoCompleteText) {
    this.updateAutoCompleteFilterOption(data);
  }

  @Output() onAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowOpen: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowConfirm: EventEmitter<DirtyData> = new EventEmitter<DirtyData>();
  @Output() onRowDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAutoCompleteTextChange: EventEmitter<AutoCompleteText> = new EventEmitter<AutoCompleteText>();
 
  //Table
  columnMetaData!: Array<Column>;
  displayedColumns!: string[];
  hidden: boolean = false;
  columnType = ColumnType;

  //ActionColumn
  isEdit: boolean = false;
  isDelete: boolean = false;
  beforeAction: Action[] = [];
  afterAction: Action[] = [];
  inbetweenAction: Action[] = [];

  //Incell Confirm Action 
  editableColFormGrp!: FormGroup;
  private editableColumn!: Column[];

  //incell
  selectedRowIndex: number = -1;
  private selectedRow: any;
  hasCancel: boolean = true;
  @ViewChild(MatTable) table!: MatTable<any>;

  //Yeni hücre ekleme
  private isAdd: boolean = false;
  private hasNewFormGroup: boolean = false;

  //Incell AutoComplete
  autoCompleteFilterOptions: any = {};
  private subscription: Subscription = new Subscription;

  //Incell regex Exp
  nonWhitespaceRegExp: RegExp = new RegExp("\\s");

  /**
   * 
   * @param dialog a dependency injection (DI) for MatDialog
   */
  constructor(private dialog: MatDialog) { }
  
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
/**
 * 
 * @param data 
 * @returns 
 */
  private initColumnMetaData(data: Array<Column>) {
    if (!(data && data.length)) {
      this.hidden = true;
      return;
    }
    this.columnMetaData = data;
    this.displayedColumns = data.reduce(
      (acc: string[], curr: Column) => acc.concat(curr.name),
      []
    );
    this.hidden = false;
  }

  private initTableConfig(data: TableConfig) {
    if (!data) {
      return;
    }

    if (Object.keys(data).length === 0) {
      return;
    }

    if (data.hasOwnProperty("inline")) {
      this.isEdit = data.inline!.isEdit;
      this.isDelete = data.inline!.isDelete;
      this.displayedColumns.push("Action");
      this.getEditableColFromMetaData();
      //For showing extra action button
      if (data.inline!.hasOwnProperty("options")) {
        this.beforeAction = data.inline!.options!.before
          ? data.inline!.options!.before
          : [];
        this.afterAction = data.inline!.options!.after
          ? data.inline!.options!.after
          : [];
        this.inbetweenAction = data.inline!.options!.inbetween
          ? data.inline!.options!.inbetween
          : [];
      }

      if (data.inline!.hasOwnProperty("isAdd")) {
        this.isAdd = data.inline!.isAdd!;
      }
    }
  }

  private getEditableColFromMetaData() {
    this.editableColFormGrp = new FormGroup({});
    this.hasNewFormGroup = true;
    this.editableColumn = this.columnMetaData.reduce((acc: Column[], col: Column) => {
      this.editableColFormGrp.addControl(col.name, new FormControl(null, this.getCellValidation(col)));
      if (col?.isEditable) {
        acc.push(col);
      }
      return acc;
    }, []);
  }

  private getCellValidation(col: Column) {
    if (col?.validation) {
      if (col?.isRequired) {
        col!.validation.push(Validators.required);
        col!.validation.push(Validators.pattern(this.nonWhitespaceRegExp));
      }
      return col!.validation;
    }
    if (col?.isRequired) {
      return [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)];
    }
    return;
  }

  private updateSelectedRow(data: DirtyData) {
    if (!data) {
      return;
    }
    this.dataSource.data[data.index] = data.selectedRow;
    this.selectedRowIndex = -1;
    this.table.renderRows();
  }

  private deleteSelectedRow(data: any) {
    if (!data) {
      return;
    }
    this.dataSource.data.splice(data.rowIndex, 1);
    this.table.renderRows();

  }

  rowOpen(rowIndex: number, data: any) {
    this.selectedRow = JSON.parse(JSON.stringify(data));
    this.initSelectedRowValToFormGrp();
    this.selectedRowIndex = rowIndex;
    this.onRowOpen.emit(JSON.parse(JSON.stringify(data)));
  }

  private initSelectedRowValToFormGrp() {
    if (this.hasNewFormGroup) {
      this.hasNewFormGroup = false;
    }

    this.editableColumn.forEach((col: Column) => {
      let value: any;
      switch (col.type) {
        case this.columnType.DATE:
        case this.columnType.DATETIME:
          value = this.selectedRow[col.name] ? new Date(this.selectedRow[col.name]) : null;
          break;
        case this.columnType.SLIDE:
        case this.columnType.CHECKBOX:
          value = this.initCheckBoxOrSlideValue(col);
          break;
        case this.columnType.AUTOCOMPLETE:
          this.initAutoCompleteValue(col);
          value = this.selectedRow[col.name];
          break;
        default:
          value = this.selectedRow[col.name];
          break;
      }
      this.editableColFormGrp.get(col.name)!.setValue(value, { emitEvent: false });
    });
    if (Object.keys(this.editableColFormGrp.controls).length) {
      this.editableColFormGrp.markAllAsTouched();
    }
  }


  private initAutoCompleteValue(col: Column) {
    this.autoCompleteFilterOptions[col.name] = new Array<DropDown>();
    this.subscription = this.editableColFormGrp.get(col.name)!.valueChanges.pipe(debounceTime(1000), filter(x => !!x.trim())).subscribe((text: string) => {
      let data: AutoCompleteText = {
        column: col.name,
        text: text
      }
      this.onAutoCompleteTextChange.emit(data);
    });
  }

  private initCheckBoxOrSlideValue(col: Column) {
    let val: any = this.selectedRow[col.name];
    if (col?.enableBit) {
      this.subscription = this.editableColFormGrp.get(col.name)!.valueChanges.subscribe((data: any) => {
        val = data ? 1 : 0;
        this.editableColFormGrp.get(col.name)!.setValue(val, { emitEvent: false });
      });
    }
    return val;
  }

  inlineEditAction(data: any, revert: boolean = false) {
    this.subscription.unsubscribe();
    let confirmData = this.getDirtyData();
    if (!confirmData || revert) {
      this.selectedRowIndex = -1;
      this.onRowClose.emit(JSON.parse(JSON.stringify(data)));
      return;
    }
    this.onRowConfirm.emit(confirmData);
  }
/**
 * 
 * @param data  Silinen satırın datarowu
 * @param index  silinen satır numrası
 */
  inlineDeleteAction(data: any, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { title: 'Delete', message: 'Satırı silmek istiyormusunuz?' };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((confirmedDelete: any) => {
      if (confirmedDelete) {
        let emitData = JSON.parse(JSON.stringify(data));
        emitData.rowIndex = index
        this.onRowDelete.emit(emitData);
        this.dataSource.data.splice(data.rowIndex, 1);
        this.table.renderRows();
      }});
  }

  private getDirtyData() {
    let result: DirtyData = {} as DirtyData;
    let dirtyFields = this.editableColumn.reduce((acc: any, col: Column) => {
      if (this.editableColFormGrp.get(col.name)!.dirty) {
        this.selectedRow[col.name] = this.editableColFormGrp.get(col.name)!.value;
        acc[col.name] = this.selectedRow[col.name];
        this.editableColFormGrp.get(col.name)!.reset(this.selectedRow[col.name], { emitEvent: false });
      }
      return acc;
    }, {});

    if (Object.keys(dirtyFields).length === 0) {
      return;
    }

    result.index = this.selectedRowIndex;
    result.selectedRow = this.selectedRow;
    result.dirtyFields = dirtyFields;
    return result;
  }

  omitSpecialChar(event: any) {
    let key = event.charCode;
    return ((key > 47 && key < 58) || key == 45 || key == 46);
  }

  private updateAutoCompleteFilterOption(param: AutoCompleteText) {
    if (!param) {
      return;
    }
    this.autoCompleteFilterOptions[param.column] = param.data;
  }

  autoCompleteDisplayFn(event: any) {
    return (!event) ? "" : event;
  }

  addInlineRow() {
    //pre check
    if (!this.isAdd) {
      return;
    }

    if(!this.hasNewFormGroup && !this.editableColFormGrp.valid){
       this.editableColFormGrp.markAllAsTouched();
       return;
     }

    //closing the opened row
    this.subscription.unsubscribe();
    this.selectedRowIndex = -1;

    this.columnMetaData.forEach((col: Column) => {
      this.editableColFormGrp.get(col.name)!.reset(null, { emitEvent: false });
      switch (col.type) {
        case this.columnType.SLIDE:
        case this.columnType.CHECKBOX:
          if (col?.enableBit) {
            this.subscription = this.editableColFormGrp.get(col.name)!.valueChanges.subscribe((data: any) => {
              let val = data ? 1 : 0;
              this.editableColFormGrp.get(col.name)!.setValue(val, { emitEvent: false });
            });
          }
          break;
        case this.columnType.AUTOCOMPLETE:
          this.initAutoCompleteValue(col);
          break;
      }
    });

    //adding new row
    this.selectedRow = this.editableColFormGrp.getRawValue();
    this.selectedRowIndex = this.dataSource.data.length;
    this.dataSource.data.push(JSON.parse(JSON.stringify(this.selectedRow)));
    this.table.renderRows();
    this.hasNewFormGroup = true;
    
  }
}
