import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { IDomainUser, ILoginComponent } from 'src/xergor/shared/models/applicationUser.model';
 
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export  class LoginComponent implements OnInit {

  @Output() g_userLogin: EventEmitter<ILoginComponent> = new EventEmitter();


  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loginService: LoginService
  ) {}

  ngOnInit(): void
  {
      this.loginForm = this.formBuilder.group({
          userCode: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  get f():{ [key: string]: AbstractControl; } { return this.loginForm?.controls}

  onSubmit() 
  {
      this.submitted = true;
 
      if (this.loginForm?.invalid) 
         return;
      this.loading = true;
      try
      {
          this.loginService.login(this.f?.['userCode'].value, this.f?.['password'].value)
              .pipe(first())
              .subscribe(
                  (_data: IDomainUser) => {
                     // this.loginService.getAll().subscribe((_userdata: any)=>{});
                     this.g_userLogin.emit({authUser: _data.authenticationUser,isLoggin: true});
                      this.router.navigate(['/dashboard']);    
                  } );
                  this.loading = false;
      }
      catch (err:any) 
      {
          this.loading = false;
      }
  }
}