import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseAuthenticationService } from '../services/dbauthentication.service';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    g_apiUrl: string;
    constructor(private authenticationService: DatabaseAuthenticationService,private g_configurationService: ConfigurationService) {
        this.g_apiUrl = g_configurationService.g_globalSettings[0].apiUrl;

     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.autUserValue;
        const isLoggedIn = user && user.accessToken;
        const isApiUrl = request.url.startsWith(this.g_apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}