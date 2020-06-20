import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.css"]
})
export class DocumentationComponent implements OnInit {
  _getDocData: any;
  renderFlag: boolean = false;
  showSpinner: boolean = false;
  lookUpFields: any = ["heading", "html", "description", "param"];
  tabularData: any = [];
  heading: string = "";
  breadCrumb: any = [];
  description: boolean = true;
  html: boolean = true;
  param: boolean = true;

  @Output() routedToHome: EventEmitter<any> = new EventEmitter();

  @Input("getDocData")
  set getDocData(value: any) {
    this.breadCrumb = [];
    this.showSpinner = true;
    this.renderFlag = false;
    this._getDocData = value;
    this.showSpinner = false;
    this.renderFlag = true;
    this.heading = this._getDocData.choosen[0]["heading"];
    this.breadCrumb.push("Home");

    if (value.docSet.menu.heading) {
      this.breadCrumb.push("/");
      this.breadCrumb.push(value.docSet.menu.heading);
    }
    if (
      this.heading &&
      value.docSet.menu.heading.toLowerCase() != this.heading.toLowerCase()
    ) {
      this.breadCrumb.push("/");
      this.breadCrumb.push(this.heading);
    }
  }
  constructor() {}

  ngOnInit() {
    this.describeData();
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  describeData() {}
  traverse(item: string) {
    if (item.toLowerCase() == "home") {
      this.routedToHome.emit(true);
    } else;
  }
}
