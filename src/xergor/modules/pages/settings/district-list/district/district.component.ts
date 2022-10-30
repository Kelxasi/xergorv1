import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';
import { Column } from 'src/xergor/shared/components/nsgrid/nsgrid.model';
import { XHergorAlertService } from 'src/xergor/shared/components/xergor-alert';
import { ICity } from 'src/xergor/shared/models/city.model';
import { IDistrictData } from 'src/xergor/shared/models/district.model';
import { DistrictService } from '../district.service';
import { CityColumnCollection } from './districtDataColumn';
 

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})

export class DistrictComponent implements OnInit, OnDestroy {

  keyword: string = 'cityName';
  f_cities!: MatTableDataSource<ICity[]>;
  column!: Array<Column>;

  g_keyword: string = 'cityName';

  f_districtForm!: FormGroup;

  district: IDistrictData = {
    id: 0,
    districtCode: "",
    districtName: "",
    inUse: false,
    cityId: 0,
    insertedAt: new Date(),
    insertedBy: 0,
    updatedAt: new Date(),
    UpdatedBy: 0
  };

  f_isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: DistrictService,
    private alertService: XHergorAlertService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.f_districtForm = formBuilder.group({
      id: 0,
      districtCode: ['', Validators.required],
      districtName: ['', Validators.required],
      inUse: true,
      cityId: [0, Validators.required],
      cityCode: '',
      cityName: ''
    });

    this.route.params.pipe(catchError((err: any) => this.handleError(err))).subscribe((params: any) => {
      let id = +params['id'];
      if (id === 0) {
        this.f_isAddMode = true;
      }
      else if (id > 0) {
        this.f_isAddMode = false;
        this.getDistrictById(id);
      }
      else {
        this.router.navigate(['/account/address/district']);
      }
    });
  }

  ngOnInit(): void {
    this.column = CityColumnCollection;
    this.loadData();
  }

  get DistrictForm(): { [key: string]: AbstractControl; } { return this.f_districtForm!.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.f_districtForm?.invalid) {
      return;
    }

    this.loading = true;

    this.fieldLoad();

    if (this.submitted) {
      if (this.f_isAddMode) {
        this.createDistrict();
        this.alertService.success('Kayıt başarılı.');
      }
      else {
        this.updateDistrict(this.district!.id);
        this.alertService.success('Kayıt Güncellendi');
      }
    }
  }

  private fieldLoad() {
    this.district!.id = this.DistrictForm['id'].value;
    this.district!.cityId = this.DistrictForm['cityId'].value;
    this.district!.districtCode = this.DistrictForm['districtCode'].value;
    this.district!.districtName = this.DistrictForm['districtName'].value;
    this.district!.inUse = this.DistrictForm['inUse'].value;

    if (this.district && this.district!.cityId === 0) {
      this.submitted = false;
      this.alertService.warn('Şehir zorunludur.');
      return;
    }

    if (this.district && this.district!.districtCode === '') {
      this.submitted = false;
      this.alertService.warn('İlçe kodu zorunludur.');
      return;
    }

    if (this.district && this.district!.districtName === '') {
      this.submitted = false;
      this.alertService.warn('İlçe adı zorunludur.');
      return;
    }


  }

  private createDistrict() {

    this.service.setDistrict(this.district)
      .pipe(first())
      .subscribe(
        (response: any) => {
          this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          // this.router.navigate(['/account/address/district/'+this.district.id, { relativeTo: this.route }]); 
          this.district = response.data;
          this.router.navigate(['/account/address/district/detail/' + this.district!.id]);

          this.alertService.success(response);
          console.log(response.data);
          this.loading = false;
          this.getPulseClass();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  /**
   * 
   * @param id 
   */
  private updateDistrict(id: number) {

    this.district!.id = this.DistrictForm['id'].value;
    // this.district!.cityId = this.DistrictForm['cityId'].value;
    this.district!.districtCode = this.DistrictForm['districtCode'].value;
    this.district!.districtName = this.DistrictForm['districtName'].value;
    this.district!.inUse = this.DistrictForm['inUse'].value;

    this.service.updateDistrict(id, this.district!)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe((response: any) => {
        console.log('district updated: ' + response.data);
        this.district = response.data;
        this.loading = false;
        this.router.navigate(['/account/address/district/detail/' + this.district!.id]);
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  loadData() {
    this.getCities();
  }

  getCities() {
    this.service.getCities().subscribe(l_cities => {
      this.f_cities = new MatTableDataSource(l_cities);
      // let l_allCities = { id: 0, cityCode: '', cityName: '', inUse: false };
      // this.f_cities.unshift(l_allCities);
    });
  }

  getDistrictById(id: number) {
    this.service.getDistrictById(id)
      .pipe(catchError((err: any) => this.handleError(err)))
      .subscribe((district: any) => {
        this.district = district.data;
        if (!this.f_isAddMode && this.district && this.district.id > 0) {
          this.DistrictForm["id"].setValue(this.district?.id);
          this.DistrictForm['districtCode'].setValue(this.district?.districtCode);
          this.DistrictForm['districtName'].setValue(this.district?.districtName);
          this.DistrictForm["inUse"].setValue(this.district?.inUse);
          this.DistrictForm["cityId"].setValue(this.district?.cityId);
          this.getCityById(this.district?.cityId);

        }
      });
  }

  getCityById(id: number) {
    this.service.getCityById(id)
      .pipe(catchError((err: any) => this.handleError(err)))
      .subscribe((city: any) => {
        if (!this.f_isAddMode && city && city.id > 0) {
          this.DistrictForm["cityId"].setValue(city.id);
          this.DistrictForm["cityCode"].setValue(city.cityCode);
          this.DistrictForm["cityName"].setValue(city.cityName);
        }
      });
  }


  delete(id: number) {
    this.service.deleteDistrict(id)
      .pipe(catchError((err: any) => this.handleError(err)))
      .subscribe((res: any) => {
        this.router.navigate(['/account/address/district']);
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  /**
   * 
   * @param error 
   * @returns 
   */
  private handleError(error: any) {
    return throwError(() => new Error(error))
  }

  /**
   * 
   */
  ngOnDestroy() {
    this.f_isAddMode = false;
    this.alertService.clear();
    this.submitted = false;
  }

  /**
   * 
   * @param e Seçilen şehir satırı
   */
  selectEvent(e: any) {
    if (!e || !e.data || e.data.length === 0) {
      return;
    }

    this.DistrictForm["cityId"].setValue(e.data.id);
    this.DistrictForm["cityCode"].setValue(e.data.cityCode);
    this.DistrictForm["cityName"].setValue(e.data.cityName);
    this.DistrictForm["cityId"].markAsDirty();
  }

  clearEvent(e: any) {
    this.district.cityId = 0;
    this.DistrictForm["cityCode"].setValue('');
    this.DistrictForm["cityName"].setValue('');
    this.DistrictForm["cityId"].setValue(0);
    this.DistrictForm["cityId"].markAsDirty();
  }

  getPulseClass(): string {
    let pulseClass = '';
    if (this.f_districtForm.valid && this.f_districtForm.dirty) {
      pulseClass = 'pulse';
    }
    else {
      pulseClass = '';
    }
    return pulseClass;
  }
}