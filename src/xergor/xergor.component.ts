import { Component } from '@angular/core';

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
  isSideNavCollapsed = false;
  screenWidth= 0;

  constructor( ) {}


  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
