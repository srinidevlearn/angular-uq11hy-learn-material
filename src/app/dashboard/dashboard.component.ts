import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as docData from "../doc";

// import * as doct

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  apiFinder = new FormControl();
  doc: any = [];
  sideNavMenuData: any = [];
 
  panelOpenState = true;

 
  constructor() {
    this.doc = docData.document;
  }

  ngOnInit() {
    this.renderMenu(); 
  }

  renderMenu() {
    let index = 0;
    this.doc.forEach((item: any) => {
      let header: any = {};
      header["header"] = item.menu.heading;
     
      header["subMenu"] = [];
      header["level"] = index;
      header["hasSubMenu"] = false;
      if (item.menu.submenu) {
        for (let item2 of item.menu.submenu) {
          header["subMenu"].push({ header: item2.heading, level: index });
        }
        header["hasSubMenu"] = true;
      }
      this.sideNavMenuData.push(header);
      index++;
    });
    // console.log(this.sideNavMenuData);
  }
}
