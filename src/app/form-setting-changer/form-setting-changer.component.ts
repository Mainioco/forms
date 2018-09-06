import { Component, OnInit } from "@angular/core";
import {
  DropdownQuestion,
  FormLayout,
  IOptions,
  QuestionBase
} from "mainio-forms";
import { FormGroup } from "@angular/forms";
import { FormLayoutService } from "../services/form-layout.service";

@Component({
  selector: "mainio-form-form-setting-changer",
  templateUrl: "./form-setting-changer.component.html",
  styleUrls: ["./form-setting-changer.component.css"]
})
export class FormSettingChangerComponent implements OnInit {
  questions: QuestionBase<any>[] = [];
  constructor(private _layoutService: FormLayoutService) {}

  ngOnInit() {
    let opts = Object.keys(FormLayout);
    this.questions.push(
      new DropdownQuestion({
        key: "layout_selector",
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

  reportChangeLayout(event: FormGroup) {
    if (!event.controls) return;

    switch (event.controls["layout_selector"].value) {
      case "OneRow":
        this._layoutService.layout = FormLayout.OneRow;
        break;
      case "Col_1":
        this._layoutService.layout = FormLayout.Col_1;
        break;
      case "Col_2":
        this._layoutService.layout = FormLayout.Col_2;
        break;
      default:
        this._layoutService.layout = FormLayout.Default;
        break;
    }
  }
}
