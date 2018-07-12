import { Component } from "@angular/core";
import { QuestionBase } from "mainio-forms";
import { InputQuestion } from "mainio-forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  questions: QuestionBase<any>[] = [
    new InputQuestion({
      key: "api_token",
      label: "API Key",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    }),
    new InputQuestion({
      key: "api_secret",
      label: "API Secret",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    }),
    new InputQuestion({
      key: "a_api_address",
      label: "API Address",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    }),
    new InputQuestion({
      key: "a_api_conn_name",
      label: "Connection Name",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    }),
    new InputQuestion({
      key: "h_external_system",
      label: "Connection Name",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    })
  ];
}
