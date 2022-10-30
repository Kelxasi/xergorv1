import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GlobalMaterialModule } from "./components/angular-material/material-module";
import { AutoCompletListModule } from "./components/autocomplete-list/autocomplete-list.module";
import { NSgridComponent } from "./components/nsgrid/nsgrid.component";
import { XergorAlertModule } from "./components/xergor-alert";
import { DatabaseInterceptor } from "./controller/database.interceptor";
import { ErrorInterceptor } from "./controller/error.interceptor";
import { JwtInterceptor } from "./controller/token.interceptor";
import { ConfigurationService } from "./services/configuration.service";
import { DataBaseService } from "./services/database.service";
import { DatabaseAuthenticationService } from "./services/dbauthentication.service";

 
@NgModule({
  declarations: [
    NSgridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GlobalMaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GlobalMaterialModule,
    NSgridComponent,
    XergorAlertModule,
 
  ],
  providers: [
    ConfigurationService,
    DatabaseAuthenticationService,
    DataBaseService,
  /*  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DatabaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
*/
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule,
        providers: [
          ConfigurationService,
          DatabaseAuthenticationService,
          DataBaseService,
          /*
          { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
          { provide: HTTP_INTERCEPTORS, useClass: DatabaseInterceptor, multi: true },
          { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
        */]
    };
}
}
