import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IAccount } from 'src/xergor/shared/models/account.model';
import { IDomainUser } from 'src/xergor/shared/models/applicationUser.model';
import { ConfigurationService } from 'src/xergor/shared/services/configuration.service';
import { DatabaseAuthenticationService } from 'src/xergor/shared/services/dbauthentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = '';
  private userSubject: BehaviorSubject<IDomainUser | null>;
  public user: Observable<IDomainUser | null>;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,private authService: DatabaseAuthenticationService, private configurationService: ConfigurationService) {
    this.userSubject = new BehaviorSubject<IDomainUser | null>(JSON.parse(localStorage.getItem('user')   || '{}'));
    this.user = this.userSubject.asObservable();
    this.apiUrl = this.configurationService.g_globalSettings[0].apiUrl;
 
  }
  /**
   * Local storage verisini geitir.
   */
   public get userValue(): IDomainUser | null {
    return this.authService.autUserValue;
  }

  /**
   * Kullanıcı girişi 
   * @param userCode Kullanıcı Kodu
   * @param password Kullanıcı Adı
   * @returns 
   */
  login(userCode: string, password: string): Observable<IDomainUser> {
    let userData = JSON.stringify({ "userCode": userCode, "password": password });
    let url = this.apiUrl + '/api/login';
    return this.authService.login(url,userData).pipe<any>(tap(() => {
        return;
    }));
  }
  register(user: IAccount) {
    let reqHeader = new HttpHeaders({ 'accept': '*/*;', 'Content-Type': 'application/json; charset=utf-8 ', 'No-Auth': 'True' });
    return this.http.post(`${this.apiUrl}/api/v1/User`, user, { headers: reqHeader });
  }
  getAll(): Observable<any> {
    let headerOption = new HttpHeaders({ 'Content-Type': 'application/json;'/*, 'Authorization': this.userValue.token */});
    return this.http.get<IAccount>(`${this.apiUrl}/api/v1/User`, { headers: headerOption });
  }
  getById(id: string) {
    let headerOption = new HttpHeaders({ 'Content-Type': 'application/json;', 'Authorization': this.userValue?.accessToken || ''  });
    let reqHeader = new HttpHeaders({ 'accept': '*/*;', 'Content-Type': 'application/json; charset=utf-8 ', 'No-Auth': 'True' });
    return this.http.get<IAccount>(`${this.apiUrl}/api/v1/User/${id}`, { headers: reqHeader });
  }
  update(id: number, params: any) {
    return this.http.put(`${this.apiUrl}/api/v1/User/${id}`, params)
      .pipe(map(x => {
        if (id == this.userValue?.authenticationUser.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return x;
      }));
  }
  delete(id: number) {
    let reqHeader = new HttpHeaders({ 'accept': '*/*;', 'Content-Type': 'application/json; charset=utf-8 ', 'No-Auth': 'True' });
    return this.http.delete(`${this.apiUrl}/api/v1/User/${id}`, { headers: reqHeader })
      .pipe(map(x => {
        if (id == this.userValue?.authenticationUser.id) {
          this.authService.logout();
        }
        return x;
      }));
  }
}