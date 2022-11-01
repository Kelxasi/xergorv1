import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district.component';
import { DistrictListComponent } from './list/district-list.component';
 

const routes: Routes = [
  {
    path: '', 
    children: [
      {path: '', component: DistrictListComponent },
      { path: ':id', component: DistrictComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
