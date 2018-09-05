import { Component, OnInit } from "@angular/core";
import {
  DropdownQuestion,
  FormLayout,
  IOptions,
  QuestionBase
} from "mainio-forms";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "mainio-form-form-setting-changer",
  templateUrl: "./form-setting-changer.component.html",
  styleUrls: ["./form-setting-changer.component.css"]
})
export class FormSettingChangerComponent implements OnInit {
  questions: QuestionBase<any>[] = [];
  constructor() {}

  ngOnInit() {
    let opts = Object.keys(FormLayout);
    this.questions.push(
      new DropdownQuestion({
        label: "Form layout",
        options: opts.map(x => {
          let i: IOptions = {
            key: x,
            value: x,
            label: x
          };
          return i;
        })
      })
    );
  }

  reportChangeLayout(event: FormGroup) {}
}
