import { Component, OnInit } from "@angular/core";
import { QuestionBase } from "mainio-forms/mainio-forms";
import { InputQuestion } from "mainio-forms/mainio-forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MapperExampleService } from "./services/mapper-example.service";

interface TabChangeEvent {
  index: number;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Mainioco Forms demo";
  index: number = 0;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private mapper: MapperExampleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.index = +params["index"];
    });
  }
  navigate(index: TabChangeEvent) {
    let url: string = "";
    this.index = index.index;
    switch (index.index) {
      case 0:
        url = "/basic?index=0";
        break;
      case 1:
        url = "/store?index=1";
        break;
      case 2:
        url = "/store-split?index=2";
        break;
      case 3:
        url = "/chat-send?index=3";
        break;
      case 4:
        url = "/json?index=4";
        break;
      default:
        break;
    }
    this._router.navigateByUrl(url);
  }
}
