import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
    providedIn: 'root'
})

export class XergorNavigationService {
    private g_navHistory: string[] = [];

    constructor(private g_router: Router, private g_location: Location) {
        this.g_router.events.subscribe((l_event) => {
            if (l_event instanceof NavigationEnd) {
                this.g_navHistory.push(l_event.urlAfterRedirects);
            }
        })
    }

    backToOldUrl(): void {
        this.g_navHistory.pop();
        if (this.g_navHistory.length > 0) {
            this.g_location.back();
        }
        else {
            this.g_router.navigateByUrl('/');
        }
    }
}