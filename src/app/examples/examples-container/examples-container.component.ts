import { Component, OnInit } from "@angular/core";
import { QuestionBase } from "mainio-forms/mainio-forms";
import { InputQuestion } from "mainio-forms/mainio-forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MapperExampleService } from "../../services/mapper-example.service";

interface TabChangeEvent {
  index: number;
}
@Component({
  selector: "mainio-form-examples-container",
  templateUrl: "./examples-container.component.html",
  styleUrls: ["./examples-container.component.css"]
})
export class ExamplesContainerComponent implements OnInit {
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
        url = "/examples?index=0";
        break;
      case 1:
        url = "/examples?index=1";
        break;
      case 2:
        url = "/examples?index=2";
        break;
      case 3:
        url = "/examples?index=3";
        break;
      case 4:
        url = "/examples?index=4";
        break;
      default:
        console.error("Ind", index);
        break;
    }
    this._router.navigateByUrl(url);
  }
}
