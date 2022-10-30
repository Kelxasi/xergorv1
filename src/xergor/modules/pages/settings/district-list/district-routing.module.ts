import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DistrictListComponent } from './district-list.component';
import { DistrictComponent } from './district/district.component';

const routes: Routes = [
  {
    path: '',// canActivate: [AuthControlGuard],
    children: [
      { path: 'list', component: DistrictListComponent },
      { path: 'detail/:id', component: DistrictComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
