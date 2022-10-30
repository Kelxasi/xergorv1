import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { XHergorAlertService } from './alert.service';

@Component({
    selector: 'xergor-alert',
    templateUrl: './xergor-alert.component.html',
    styleUrls: ['./xergor-alert.component.scss']
})
export class XergorAlertComponent implements OnInit, OnDestroy {

    @Input() g_alertId = 'default-alert';
    @Input() g_fade = true;

    g_alerts: Alert[] = [];
    g_alertSubscription!: Subscription;
    g_routeSubscription!: Subscription;

    constructor(private g_router: Router, private g_alertService: XHergorAlertService) { }

    ngOnInit() {

        this.g_alertSubscription = this.g_alertService.onAlert(this.g_alertId)
            .subscribe(alert => {
                if (!alert.message) {
                    this.g_alerts = this.g_alerts.filter(x => x.keepAfterRouteChange);
                    this.g_alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }
                this.g_alerts.push(alert);

                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                   
                }
            });

        this.g_routeSubscription = this.g_router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.g_alertService.clear(this.g_alertId);
            }
        });
    }

    ngOnDestroy() {
        this.g_alertSubscription.unsubscribe();
        this.g_routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        if (!this.g_alerts.includes(alert)) return;

        if (this.g_fade) {

            this.g_alerts.find(x => x === alert)!.fade = true;
            setTimeout(() => { this.g_alerts = this.g_alerts.filter(x => x !== alert); }, 250);
        } else {
            this.g_alerts = this.g_alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('alert show');
        }

        return classes.join(' ');
    }

    cssClass2(): string{
      return 'alert show';
    }
}
