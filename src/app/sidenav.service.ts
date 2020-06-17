import { Injectable } from '@angular/core';
import * as docData from "./doc";
@Injectable()
export class SidenavService {
  sideNavMenuData=[];
  constructor() { 

  }

  sideNavMenu(){
    this.sideNavMenuData = [];

    this.sideNavMenuData = this.doc.map(
      (item: any, index: number, arr: any) => {
        let header: any = {
          header: item.menu.heading
        };
        let subMenu = item.menu.submenu.map((item: any) => {return {header:item.heading}
        });
        header["subMenu"] = subMenu;
        return header;
      }
    );

    return this.sideNavMenuData;
  }

}