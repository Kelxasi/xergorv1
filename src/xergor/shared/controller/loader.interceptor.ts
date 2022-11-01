import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadService } from "../services/loader.service";

@Injectable({
    providedIn: 'root'
})

export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoadService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.g_isLoading.next(true);
        
        return next.handle(req).pipe(
            finalize(
                () => {
                    this.loaderService.g_isLoading.next(false);
                }
            )
        )
    }
    
}