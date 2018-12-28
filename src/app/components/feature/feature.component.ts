import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "mainio-form-feature",
  templateUrl: "./feature.component.html",
  styleUrls: ["./feature.component.css"]
})
export class FeatureComponent implements OnInit {
  @Input()
  icon: string;
  @Input()
  url: string;
  @Input()
  title: string;
  constructor() {}

  ngOnInit() {}
}
