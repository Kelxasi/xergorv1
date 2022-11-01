import { NgModule } from '@angular/core';
import { DistrictService } from './district.service';
import { CommonModule } from '@angular/common';
import { DistrictRoutingModule } from './district-routing.module';
import { SharedModule } from 'src/xergor/shared/shared.module';
import { AutoCompletListModule } from 'src/xergor/shared/components/autocomplete-list/autocomplete-list.module';
import { DistrictComponent } from './district.component';
import { DistrictListComponent } from './list/district-list.component';
 
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
