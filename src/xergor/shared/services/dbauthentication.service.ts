import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { tap } from 'rxjs';
import { IDomainUser } from "../models/applicationUser.model";
 
@Injectable({
    providedIn: 'root'
})

export class DatabaseAuthenticationService {
    
    private g_userSubject: BehaviorSubject<IDomainUser|null> ;
    public g_user: Observable<IDomainUser|null>;

    constructor( private g_router: Router,private g_http: HttpClient){
        this.g_userSubject = new BehaviorSubject<IDomainUser | null>(JSON.parse(localStorage.getItem('user')  || '{}'));
        this.g_user = this.g_userSubject.asObservable();
    }

    public get autUserValue(): IDomainUser | null {
        return this.g_userSubject.value;
    }

    login(url: string,data: any): Observable<IDomainUser>{
        let options = {};
        this.setHeaderOptions(options,true);
        return this.g_http.post<IDomainUser>(url,data,options).pipe(
            tap((_user: any) => {
                localStorage.setItem('user',JSON.stringify(_user));
                this.g_userSubject.next(_user);
                return _user;
            }),
            catchError(this.handleError)
        );
    }

    logout(){
        localStorage.removeItem('user');
        this.g_userSubject.next(null);
        this.g_router.navigate(['/login']);
    }

    private handleError(error: any){
        if(error.error instanceof ErrorEvent){
            console.error('Error'+error.error.message);
        }
        else
        {
            console.error(`Status: ${error.status}, `+ `statusText: ${error.statusText}, `+ `message: ${error.error.message}`);
        }
        return throwError(new Error('Server Error'));
    }

    
    private setHeaderOptions(options: any,isNeedOption?: boolean){
        if(isNeedOption){
            options["headers"] = new HttpHeaders()
            .append('accept','*/*')
            .append('Content-Type','application/json; charset=utf-8')
            .append('No-Auth','True');
        }
    }
}