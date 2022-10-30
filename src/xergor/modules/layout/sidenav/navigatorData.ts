export interface IMenu {
    menuName: string;
    icon?: string;
    opened?: boolean;
    menuCategory?: IMenuCategory[];

}

interface IMenuCategory{
    categoryTitle: string;
    categoryDetail: ICategoryDetail[];
}

interface ICategoryDetail{
    name: string;
    routeLink: string;
}


export interface ISidenavToggle {
    screenWidth: number;
    collapsed: boolean;
  }