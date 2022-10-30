import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DatabaseAuthenticationService } from "../services/dbauthentication.service";

@Injectable({
    providedIn: 'root'
})

export class AuthControlGuard implements CanActivate {
    constructor(private g_router: Router , private g_authenticateService: DatabaseAuthenticationService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
        
        const l_user = this.g_authenticateService.autUserValue;

        if(l_user){
            //Rol kontrolleri ve yetki kontrolleri burada yapılabilir
            /*if(Yetki yoksa){
            this.g_router.navigate(['/']);
            return false;
            }*/

            return true;
        }

        this.g_router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        return false;

    }
}