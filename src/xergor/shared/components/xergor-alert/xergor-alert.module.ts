import { NgModule } from '@angular/core';
 
import { XergorAlertComponent } from './xergor-alert.component';
import { XHergorAlertService } from './alert.service';
import { CommonModule } from '@angular/common';
 
@NgModule({
    imports: [CommonModule],
    declarations: [XergorAlertComponent],
    exports: [XergorAlertComponent],
    providers: [XHergorAlertService]
})
export class XergorAlertModule { }