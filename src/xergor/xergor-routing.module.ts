import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
const routes: Routes = [
    {
     path: 'settings/district',
     loadChildren: () => import('./modules/pages/settings/district-list/district.module').then(m => m.DistrictModule)
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
