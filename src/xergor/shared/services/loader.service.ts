import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class LoadService {
    public g_isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(){}
}