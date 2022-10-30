import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { menuItemData } from './menuData';
import { fadeInOut, subMenuRotate } from './menuTrigger';

import { IMenu, ISidenavToggle } from './navigatorData';

@Component({
  selector: 'xergor-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInOut, subMenuRotate]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('filteredListElement') filteredListElement!: ElementRef; // element of items

  @Output() onToggleSidenavItem: EventEmitter<ISidenavToggle> = new EventEmitter();
  g_itemData = menuItemData; //Menu item data itemları
  g_collapsed: boolean = false; //Menü açılıp kapanması 
  g_screen_width: number = 0; //Ekran genişliği
  g_template_open_control: boolean = false; //Menü kontrolü
  g_selectedMenuData: IMenu | any ;

  //Menü template
  @Input() itemTemplate !: TemplateRef<any>;
  @ContentChild(TemplateRef) customTemplate !: TemplateRef<any>;

  /**
   * Ekran genişletilip yada daraltılınca nav datanın otomatik açılıp kapanması sağlanıyor
   * @param e 
   */
  @HostListener('window:resize', ['$event'])
  onResizeItem(e: any) {
    this.g_screen_width = window.innerWidth;
    if (this.g_screen_width <= 768) {
      this.g_collapsed = false;
      this.onToggleSidenavItem.emit({ collapsed: this.g_collapsed, screenWidth: this.g_screen_width });
    }
    else if (this.g_screen_width > 768) {
      this.g_collapsed = true;
      this.onToggleSidenavItem.emit({ collapsed: this.g_collapsed, screenWidth: this.g_screen_width });
    }
  }

  constructor(public router: Router) { }
  ngOnDestroy(): void {
    this.g_collapsed = false;
    this.g_screen_width = 0;
    this.g_template_open_control = false;
  }

  ngOnInit(): void {

    this.g_screen_width = window.innerWidth;
  }
  /**
 * Menü itemının açılıp kapanması davranışı
 * @param l_menuItem 
 */
  onHandleClick(l_menuItem: IMenu): void {
    for (let modelItem of this.g_itemData) {
      if (modelItem !== l_menuItem) {
        modelItem.opened = false;
        this.g_template_open_control = false;
      }
      else if(modelItem === l_menuItem){
        this.g_selectedMenuData = l_menuItem;
      }
    }
 
    l_menuItem.opened = !l_menuItem.opened;
    this.g_template_open_control = l_menuItem.opened;
  }

  /**
   * Menünün açılıp kapanması davranışı
   */
  onToggleCollapse(): void {
    this.g_collapsed = !this.g_collapsed;
    this.onToggleSidenavItem.emit({ collapsed: this.g_collapsed, screenWidth: this.g_screen_width });
  }

  /**
   * Menünün kapatıldığındaki davranışı
   */
  onCloseSideNav(): void {
    this.g_collapsed = false;
    this.onToggleSidenavItem.emit({ collapsed: this.g_collapsed, screenWidth: this.g_screen_width });
  }

  /**
   * Aktif seçilen menü itemın focus davranışı
   * @param l_menu_item 
   * @returns 
   */
  getActiveLinkClass(l_menuItem: IMenu): string {
    if (l_menuItem.opened) {
      return 'router-link-active';
    }
    return ''
  }

  getLinkExpandedIcon(l_menuItem: IMenu): string {
    if (l_menuItem.opened) {
      return 'keyboard_arrow_right';
    }

    return ''
  }

  onRouteHandleClick(l_menuItem: IMenu,l_url: string): void {
    for (let modelItem of this.g_itemData) {
      if (modelItem !== l_menuItem) {
        modelItem.opened = false;
        this.g_template_open_control = false;
      }
      else if(modelItem === l_menuItem){
        this.g_selectedMenuData = l_menuItem;
      }
    }
 
    l_menuItem.opened = !l_menuItem.opened;
    this.g_template_open_control = l_menuItem.opened;
    this.router.navigate([l_url]);
  }
}
