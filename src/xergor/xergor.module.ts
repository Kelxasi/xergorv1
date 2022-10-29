import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XergorComponent } from './xergor.component';
import { SidenavComponent } from './modules/layout/sidenav/sidenav.component';
import { XergorRoutingModule } from './xergor-routing.module';
import { GlobalMaterialModule } from './shared/components/angular-material/material-module';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const prefersReducedMotion = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion)').matches : false;

@NgModule({
  declarations: [
    XergorComponent,
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({disableAnimations: prefersReducedMotion}),
    XergorRoutingModule,
    GlobalMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [XergorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class XergorModule { }
