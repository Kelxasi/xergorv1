import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { IConfiguration } from '../models/configuration.model';

import Setting from 'src/assets/config.json';


@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {
    g_globalSettings!: IConfiguration[];

    private settingLoadedSource = new Subject();
    settingLoaded$ = this.settingLoadedSource.asObservable();

    constructor(){
        this.g_globalSettings = Setting;
    }
}


