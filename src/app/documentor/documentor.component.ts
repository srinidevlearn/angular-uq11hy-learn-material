import { Component, OnInit, ViewChild } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";

import * as docData from "../doc";
interface SideNavigation {
  header: string;
  subMenu?: SideNavigation[];
  level: number;
  hasSubMenu: boolean;
}

@Component({
  selector: "app-documentor",
  templateUrl: "./documentor.component.html",
  styleUrls: ["./documentor.component.css"]
})
export class DocumentorComponent implements OnInit {
  sideNavMenuData: any = [];
  doc: any = [];
  dashboard: boolean = false;
  treeControl: any;
  dataSource: any;
  hasChild: any;
  selectedNodeSet: any;
  getSubMenuChoosedItem: any = [];
  level: number;
  selectedOperation: string = "";
  openEve: boolean = false;

  filteredOptions: Observable<string[]>;
  apiFinder = new FormControl();
  @ViewChild("tree") tree: any;

  constructor() {
    this.doc = docData.document;

    if (this.doc[0]["menu"]["heading"].toLowerCase() !== "dashboard") {
      this.doc.unshift({
        menu: {
          heading: "Dashboard"
        }
      });
    }

    this.openEve = false;
    this.treeControl = new NestedTreeControl((node: any) => node.subMenu);
    this.dataSource = new MatTreeNestedDataSource();
    this.hasChild = (_: number, node: SideNavigation) =>
      !!node.subMenu && node.subMenu.length > 0;
    this.createSideNav();
  }
  ngOnInit() {
    this.nodeItem({ header: "Dashboard", level: 0 });
    this.filteredOptions = this.apiFinder.valueChanges.pipe(
      startWith(""),
      map(value => {
        const filterValue = value.toLowerCase();
        const option = this.sideNavMenuData;
        return option.filter(
          (option: any) =>
            option["header"].toLowerCase().indexOf(filterValue) === 0
        );
      })
    );
    //(this.sideNavMenuData[0])
  }
  receiveNode(node: any) {
    // this.openEve = true;
    // this.nodeItem(node);

    if ("item" in node && "sub" in node) {
      let n = node.item.subMenu
        .map(
          (subm: any, index: number): any => {
            if (subm.header.toLowerCase() == node.sub.header.toLowerCase())
              return index;
          }
        )
        .filter((i: any) => i != undefined);
      // console.log(n);

      this.optionSelected(node["item"], "fromHeader", n[0]);
    } else {
      this.optionSelected(node);
    }
  }

  createSideNav() {
    this.level;
    let index = 0;
    this.selectedOperation = "";

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
    this.dataSource.data = this.sideNavMenuData;
  }

  optionSelected(option: any, flag?: string, subMenuPos?: number) {
    // console.log(option)
    this.openEve = true;
    if (option.hasSubMenu == false) {
      this.nodeItem({ header: option.header, level: option.level });
    } else {
      if (subMenuPos) this.nodeItem(option.subMenu[subMenuPos]);
      else this.nodeItem(option.subMenu[0]);
    }
    if (flag == "fromHeader") {
      this.tree.treeControl.collapseAll();
     if (option.subMenu.length) this.tree.treeControl.expand(option);
    

    }
  }
  close() {
    this.apiFinder.setValue("");
  }
  nodeItem(node: any) {
    this.dashboard = false;
    if (node.header.toLowerCase() == "dashboard") {
      this.dashboard = true;
    }

    this.level = node.level;
    let level = node.level;
    this.selectedOperation = "";
    let slicedDocument: any = this.doc[level];
    let getSubMenuChoosedItem: any = [];
    let headerNode = node.header.toLowerCase();

    if (slicedDocument["menu"]["submenu"] != undefined) {
      getSubMenuChoosedItem = slicedDocument["menu"]["submenu"].filter(
        (item: any) => {
          let lwCased = item.heading.toLowerCase();
          if (lwCased == headerNode) return item;
        }
      );
    }

    this.selectedOperation = headerNode;
    this.getSubMenuChoosedItem = {};
    this.getSubMenuChoosedItem["docSet"] = slicedDocument;
    if (this.sideNavMenuData[level]["hasSubMenu"] == true) {
  
      this.getSubMenuChoosedItem["choosen"] = getSubMenuChoosedItem;
    }
    if (this.sideNavMenuData[level]["hasSubMenu"] == false) {
      this.getSubMenuChoosedItem["choosen"] = [slicedDocument.menu];
    }
  }
}
