import { Component } from "@angular/core";
import { QuestionBase } from "mainio-forms";
import { InputQuestion } from "mainio-forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Mainioco Forms demo";
  questions: QuestionBase<any>[] = [
    new InputQuestion({
      key: "x1",
      label: "Input with min and max length",
      type: "input",
      order: 2,
      required: true,
      minLength: 5,
      maxLength: 200
    }),
    new InputQuestion({
      key: "x2",
      label: "Input with only max length",
      type: "input",
      order: 2,
      required: true,
      maxLength: 200
    }),
    new InputQuestion({
      key: "x3",
      label: "Input with only min length, but not required",
      type: "input",
      order: 2,
      required: false,
      minLength: 5
    }),
    new InputQuestion({
      key: "x4",
      label: "No length limitations",
      type: "input",
      order: 2,
      required: true
    }),
    new InputQuestion({
      key: "x5",
      label: "Number",
      type: "number",
      order: 2,
      required: true
    })
  ];
}
