import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { ICity } from 'src/xergor/shared/models/city.model';
import { IDistrict, IDistrictData } from 'src/xergor/shared/models/district.model';
import { ConfigurationService } from 'src/xergor/shared/services/configuration.service';
import { DataBaseService } from 'src/xergor/shared/services/database.service';

export class ResponseData{
  District! : IDistrictData;
}

@Injectable({ providedIn: 'root' })

export class DistrictService {
  f_district!: IDistrict;
  district!: IDistrictData[];

  private orderCreatedSource = new Subject();
  orderCreated$ = this.orderCreatedSource.asObservable();

  city!: ICity;
  private apiUrl: string = '';
  constructor(private service: DataBaseService, private configurationService: ConfigurationService, private router: Router) {
    this.apiUrl = configurationService.g_globalSettings[0].apiUrl + '/api/v1/';
  }

  getDistrict(pageIndex: number, pageSize: number): Observable<IDistrict> {
    let url = this.apiUrl + 'District/PaginatedDistricts/';
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    return this.service.getData(url).pipe<IDistrict>(tap((response: any) => {
      return response;
    }));
  }

  getCities(): Observable<any> {
    let url = this.apiUrl + 'City/';
    return this.service.getData(url).pipe<ICity[]>(tap((response: any) => {
      return response.data;
    }));
  }

  getDistrictById(id: number): Observable<IDistrict> {
    let url = this.apiUrl + 'District/' + id;
    return this.service.getData(url).pipe<IDistrict>(tap((response: any) => {
      return response.data;
    }));
  }

  getCityById(id: number): Observable<ICity> {
    let url = this.apiUrl + 'City/' + id;
    return this.service.getData(url).pipe<ICity>(tap((response: any) => {
      return response.data;
    }));
  }

  setDistrict(l_distric: IDistrictData): Observable<boolean> {
    let url = this.apiUrl+ 'District/';
    let district = <ResponseData>{};
    district.District = l_distric; 
 
    return this.service.post(url, district).pipe<boolean>(tap((response: any) => true));
  }

  updateDistrict(id: number,dcd: IDistrictData): Observable<IDistrictData> {
    let url = this.apiUrl + 'District/'+id;
    let district = <ResponseData>{};
    district.District = dcd; 
 
    console.log(JSON.stringify(district));
    return this.service.put(url,district).pipe<any>(tap(() => {
        return;
    }));
  }

  deleteDistrict(id: number): Observable<boolean>{
    let url = this.apiUrl + 'District/'+id;
    return this.service.delete(url).pipe<any>(tap(() => {
      return;
  }));
  }
  
}
