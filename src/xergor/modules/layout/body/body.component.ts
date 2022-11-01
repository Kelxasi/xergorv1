import { Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { XHergorAlertService } from 'src/xergor/shared/components/xergor-alert/alert.service';
import { LoadService } from 'src/xergor/shared/services/loader.service';

@Component({
  selector: 'xergor-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() g_collapsed = false;
  @Input() g_screenWidth = 0;


  constructor(private a: XHergorAlertService , public loaderService: LoadService) { }

  ngOnInit(): void {

  }

  getBodyClass(): string {
    let l_styleClasss = '';
    if(this.g_collapsed && this.g_screenWidth > 768){
      l_styleClasss = 'xergor-body-trimmed';
    }
    else if(this.g_collapsed && this.g_screenWidth <= 768 && this.g_screenWidth > 0){
      l_styleClasss = 'xergor-body-md-screen';
    }

    return l_styleClasss;

  }

 

}
