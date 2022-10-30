import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { DatabaseAuthenticationService } from "../services/dbauthentication.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private g_authenticationService: DatabaseAuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if ([401, 403].indexOf(err.status) !== -1) {
                    this.g_authenticationService.logout();
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
            ));
    }
}