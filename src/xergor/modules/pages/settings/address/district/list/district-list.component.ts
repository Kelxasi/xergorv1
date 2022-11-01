import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IDistrict } from 'src/xergor/shared/models/district.model';
import { IPager } from 'src/xergor/shared/models/pager.model';
import { ConfigurationService } from 'src/xergor/shared/services/configuration.service';
import { DistrictService } from '../district.service';
  
@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})

export class DistrictListComponent implements OnInit,OnDestroy  {
  district!: IDistrict;
  paginationInfo!: IPager;
  errorReceived!: boolean;

  constructor(private g_router: Router,private service: DistrictService, private configurationService: ConfigurationService ) { }
 
  onNotifySelected(selectedRows: any) {
    console.log(selectedRows);
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.errorReceived =false;
  }

  loadData() {
    this.getDistrict(12, 0);
  }

  getDistrict(pageSize: number, pageIndex: number) {
    this.errorReceived = false;
    this.service.getDistrict(pageIndex, pageSize)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(district => {
        this.district = district;
        this.paginationInfo = {
          actualPage: district.pageIndex,
          itemsPage: district.pageSize,
          totalItems: district.count,
          totalPages: Math.ceil(district.count / district.pageSize),
          items: district.pageSize,
        };
        console.log(district);
      });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return throwError(() => new Error(error))
  }

  routeLink(l_id: number){
    this.g_router.navigate(['settings/districts/'+l_id]);
  }
}

