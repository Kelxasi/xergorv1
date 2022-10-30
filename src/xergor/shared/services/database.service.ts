import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataBaseService {
    constructor(private httpClient: HttpClient) { }

    getData(url: string): Observable<any> {
        let options = {};
        this.setHeaderOptions(options);

        return this.httpClient.get(url,options).pipe(
            tap( (response: any) => {
                return response;
            }),
            catchError(this.handlerError)
        );
    }

    post(url: string,data: any): Observable<Response> {
        return this.postDb(url,data,false);
    }

    private postDb(url: string,data: any,isNeedOption?: boolean): Observable<Response> {
        let options = {};
        this.setHeaderOptions(options,isNeedOption);
        
        return this.httpClient.post(url,data,options).pipe(
           tap((response: any) => {
                return response;
           }),
           catchError(this.handlerError) 
        );
    }

    put(url: string, data: any): Observable<Response> {
        return this.putDb(url,data,false);
    }

    private putDb(url: string,data: any,isNeedOption?: boolean): Observable<Response> {
        let option = {};
        this.setHeaderOptions(option);
        return this.httpClient.put(url,data,option).pipe(
            tap((response: any) => {
                return response;
            }),
            catchError(this.handlerError)
        );
    }

    delete(url: string): Observable<any> {
        return this.deleteDb(url,false);
    }

    private deleteDb(url: string,isNeedOption?: boolean): Observable<any>{
        let options = {};
        this.setHeaderOptions(options,isNeedOption);
        return this.httpClient.delete<any>(url,options).pipe(
            tap((response: any) => { return response}),catchError(this.handlerError)
        );
    }


    private handlerError(err: any){
        if(err.error instanceof ErrorEvent){
            console.error('Client Side error' , err.error.message);
        }
        else {
            console.error('Backend Error'+ `status ${err.status} ,` + `statusText ${err.statusText}, ` + `message ${err.error.message}` );
        }

        return throwError(() => new Error('Server Error'));
    }

    private setHeaderOptions(options: any,isNeedOption?: boolean){
        if(isNeedOption){
            options["headers"] = new HttpHeaders().append('authorization','Bearer');
        }
    }

}


