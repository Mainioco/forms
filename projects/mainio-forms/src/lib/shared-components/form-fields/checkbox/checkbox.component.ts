import { Component, OnInit, Input } from "@angular/core";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { CheckboxQuestion } from "../../../models/checkbox-question";

@Component({
  selector: "mainio-form-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.css"]
})
export class CheckboxComponent extends FormFieldBaseComponent {
  @Input()
  question: CheckboxQuestion;

  constructor() {
    super();
  }
}
