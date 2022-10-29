export interface INavigatorData {
    routeLink: string;
    icon?: string;
    menuName: string;
    opened?: boolean;
    subItems?: INavigatorData[];

}


export interface ISidenavToggle {
    screenWidth: number;
    collapsed: boolean;
  }