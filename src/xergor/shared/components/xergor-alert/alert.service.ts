import { Injectable } from "@angular/core";
import { filter, Observable, Subject } from "rxjs";
import { Alert, AlertType } from "./alert.model";

@Injectable({
    providedIn: 'root'
})

export class XHergorAlertService {
    private g_subject = new Subject<Alert>();
    private g_defaultId = 'default-alert';

    onAlert(l_id = this.g_defaultId): Observable<Alert> {
        return this.g_subject.asObservable().pipe(filter(x => x && x.id === l_id));
    }

    success(l_message: string, l_options?: any) {
        this.alert(new Alert({ ...l_options, type: AlertType.Success, message: l_message }));
    }

    error(l_message: string, l_options?: any) {
        this.alert(new Alert({ ...l_options, type: AlertType.Error,message: l_message }));
    }

    info(l_message: string, l_options?: any) {
        this.alert(new Alert({ ...l_options, type: AlertType.Info,message: l_message }));
    }

    warn(l_message: string, l_options?: any) {
        this.alert(new Alert({ ...l_options, type: AlertType.Warning,message: l_message }));
    }

    alert(l_alert: Alert) {
        l_alert.id = l_alert.id || this.g_defaultId;
        this.g_subject.next(l_alert);
    }

    clear(l_id = this.g_defaultId) {
        this.g_subject.next(new Alert({ id: l_id }));
    }
}