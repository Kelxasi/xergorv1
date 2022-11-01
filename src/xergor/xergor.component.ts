import { Component } from '@angular/core';
import { ILoginComponent } from './shared/models/applicationUser.model';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'xergor-root',
  templateUrl: './xergor.component.html',
  styleUrls: ['./xergor.component.scss']
})
export class XergorComponent {
  
  user!: ILoginComponent;
  isLogging: boolean = false;
  isSideNavCollapsed = false;
  screenWidth= 0;

  constructor( ) {}

  onDbAuth(db: any){
    this.user  = {authUser: db.authUser , isLoggin: db.isLoggin};
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
