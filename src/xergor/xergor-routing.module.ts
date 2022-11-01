import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/settings/login/login.component';
 
const routes: Routes = [
    { path: 'login',  pathMatch: 'full',component: LoginComponent },
    {
     path: 'settings/districts',
     loadChildren: () => import('./modules/pages/settings/address/district/district.module').then(m => m.DistrictModule)
    },
    {
     path: "**",
     redirectTo: ""
   }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class XergorRoutingModule { }
