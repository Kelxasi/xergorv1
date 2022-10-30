import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from '../../nsgrid/nsgrid.model';
import { TableColumn } from './table-list.model';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})

export class ListDialogComponent implements OnInit {

  listName: string = '';
  //Data Source
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  //Data Columns
  set column(data: Array<TableColumn>) { this.initColumnMetaData(data); }

  //Seçilen liste satırı
  @Output() public Selected: EventEmitter<any> = new EventEmitter<any>();


  //Tablo değişkenleri

  columnMetaData!: Array<TableColumn>;
  displayedColumns!: string[];


  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { 
      this.dataSource = data["dataSource"];
      this.column = data["column"];
      this.listName = data["listName"];
    }

  ngOnInit(): void { }

  onClose(): void {
    this.dialogRef.close({ data: this.Selected });
  }

  /**
 * 
 * @param data 
 * @returns 
 */
  private initColumnMetaData(data: Array<Column>) {
    if (!(data && data.length)) {

      return;
    }
    this.columnMetaData = data;
    this.displayedColumns = data.reduce(
      (acc: string[], curr: Column) => acc.concat(curr.name),
      []
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  handleClick(row: MatTableDataSource<any>) {
    this.Selected.emit(row);
    this.dialogRef.close({ data: row });
  }
}









