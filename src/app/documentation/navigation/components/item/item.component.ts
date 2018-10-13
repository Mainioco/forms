import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "mainio-form-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit {
  @Input()
  item;
  @Input()
  prefix: string;
  constructor() {}

  ngOnInit() {}
}
