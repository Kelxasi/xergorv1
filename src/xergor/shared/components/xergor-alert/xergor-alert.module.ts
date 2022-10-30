import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XergorAlertComponent } from './xergor-alert.component';
import { XHergorAlertService } from './alert.service';

@NgModule({
    imports: [CommonModule],
    declarations: [XergorAlertComponent],
    exports: [XergorAlertComponent],
    providers: [XHergorAlertService]
})
export class XergorAlertModule { }