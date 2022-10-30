import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from './list-dialog/table-list.model';
import { fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'autocomplete-list',
  templateUrl: './autocomplete-list.component.html',
  styleUrls: ['./autocomplete-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteListComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})

export class AutoCompleteListComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild('searchedListBox') serchedListBox!: ElementRef; // İnput elementi

  public elementRef;
  public isFocused = false;
  public isReadonly = true;
 

  // @Inputs
  /**
   * Liste veri kaynağı ve kolon koleksiyon değişkenleri
   */
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() column!: Array<TableColumn>; //Dialog tablo kolon koleksiyonu
  @Input() listName: string = ''; //Dialog listesi ismi
  @Input() textValue!: string;  //Input elementi değeri
  @Input() textFieldKeyword!: string; //Input elementinde gösterilecek değer


  @Input() public isLoading!: boolean; // input elementi yükleme maskesi  
  @Input() public disabled!: boolean; // input elementi aktif / deaktif edilmesi


  // @Outputs
  /** Listeden seçilen satırın bilgileri yayılması */
  @Output() selectedRow = new EventEmitter<any>();
  /** input elementi clear */
  @Output() readonly inputCleared: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog,elementRef: ElementRef, ) {
    this.elementRef = elementRef;
   }
 
  /** Propagates new value when model changes */
  propagateChange: any = () => { };
  /**
   * Writes a new value from the form model into the view,
   * Updates model
   */
  writeValue(value: any): void {
    this.textValue = value;
  }
  /**
    * Registers a handler that is called when something in the view has changed
    */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
    * Registers a handler specifically for when a control receives a touch event
    */
  registerOnTouched(fn: () => void): void { }
 
  /**
   * Event that is called when the control status changes to or from DISABLED
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void { }

  ngAfterViewInit() { }

  handleFocus(event: any) {
    const dialogRef = this.dialog.open(ListDialogComponent, { data: { dataSource: this.dataSource, column: this.column, listName: this.listName } });
    dialogRef.afterClosed().subscribe((dataRow: any) => {
      if (dataRow && dataRow.data) {
        this.textValue = dataRow.data[this.textFieldKeyword];
        this.selectedRow.emit(dataRow);
      }
    },
    );
  }

  public remove(e: any) {
    e.stopPropagation();
    this.inputCleared.emit(e);
    this.textValue = '';
  }

}



