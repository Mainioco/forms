import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "mainio-form-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit, OnChanges {
  @Input()
  item;
  @Input()
  prefix: string;
  _link: string;
  _props: any;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.item) return;
    if (!this.item.link) return;
    let ret = this.item.link.split("?");
    if (ret.length == 1) {
      this._link = this.item.link;
      this._props = {};
      return;
    }
    this._link = ret[0];
    let x = ret[1].split("=");
    this._props = {};
    this._props[x[0]] = x[1];
  }
}
