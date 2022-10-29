import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languageItems,userMenuItems } from './xergor-headerData';

@Component({
  selector: 'xergor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() g_collapsed = false;
  @Input() g_screenWidth = 0;

  g_canShowSearchAsOverlay = false;
  g_selectedLanguage: any;
  g_userMenuItems = userMenuItems;

  g_languageItems = languageItems;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanSearchAsOverlay(window.innerWidth);
    this.g_selectedLanguage = this.g_languageItems[0];
  }

  getHeaderClass(): string {
    let styleClass = '';
    if(this.g_collapsed /*&& this.g_screenWidth > 768*/){
      styleClass = 'xergor-head-trimmed';
    }
    else {
      styleClass = 'xergor-head-md-screen';
    }

    return styleClass;

  }


  checkCanSearchAsOverlay(inerWidth: number): void {
    if(innerWidth < 845){
      this.g_canShowSearchAsOverlay = true;
    }
    else{
      this.g_canShowSearchAsOverlay = false;
    }
  }

}
