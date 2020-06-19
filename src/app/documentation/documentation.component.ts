import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.css"]
})
export class DocumentationComponent implements OnInit {
  _getDocData: any;
  renderFlag:boolean = false;
  showSpinner:boolean = false;
  lookUpFields: any = ["heading", "html", "description", "param"];
  tabularData:any=[];
  heading:string = ""

  @Input("getDocData")
  set getDocData(value: any) {

    this.showSpinner = true;
    this.renderFlag = false;
    this._getDocData = value;
    this.showSpinner = false;
    this.renderFlag = true;
    this.heading = this._getDocData.choosen[0]['heading']
  }
  constructor() {}

  ngOnInit() {
    this.describeData();
  }

  describeData(){
  

  }
}
