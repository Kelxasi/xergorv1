import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { AutoCompleteListComponent } from './autocomplete-list.component';
import { CommonModule } from '@angular/common';
 
 

@NgModule({
  declarations: [
    AutoCompleteListComponent,ListDialogComponent
  ],
  imports: [
     CommonModule,
     SharedModule
  ],
  exports: [
    AutoCompleteListComponent,ListDialogComponent
  ]
})
export class AutoCompletListModule { }
