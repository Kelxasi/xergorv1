import { NgModule } from '@angular/core';
import { DistrictService } from './district.service';
import { DistrictListComponent } from './district-list.component';
import { CommonModule } from '@angular/common';
import { DistrictRoutingModule } from './district-routing.module';
import { SharedModule } from 'src/xergor/shared/shared.module';
import { GlobalMaterialModule } from 'src/xergor/shared/components/angular-material/material-module';
import { DistrictComponent } from './district/district.component';
import { AutoCompletListModule } from 'src/xergor/shared/components/autocomplete-list/autocomplete-list.module';
 
@NgModule({
  declarations: [DistrictComponent,DistrictListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AutoCompletListModule,
    DistrictRoutingModule
  ],
  exports: [DistrictComponent,DistrictListComponent],
  providers: [DistrictService]
})
export class DistrictModule { }
