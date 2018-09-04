import { Component } from "@angular/core";
import { QuestionBase } from "mainio-forms/mainio-forms";
import { InputQuestion } from "mainio-forms/mainio-forms";
import { Router } from "@angular/router";

interface TabChangeEvent {
  index: number;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Mainioco Forms demo";

  constructor(private _router: Router) {}

  navigate(index: TabChangeEvent) {
    let url: string = "";
    switch (index.index) {
      case 0:
        url = "/basic";
        break;
      case 1:
        url = "/store";
        break;
      case 2:
        url = "/store-split";
        break;
      case 3:
        url = "/chat-send";
        break;
      case 4:
        url = "/json";
        break;
      default:
        break;
    }
    this._router.navigateByUrl(url);
  }
}
