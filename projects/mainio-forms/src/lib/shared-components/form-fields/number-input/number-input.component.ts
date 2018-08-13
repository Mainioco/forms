import { Component, OnInit, Input } from "@angular/core";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { NumberInputQuestion } from "../../../models/number-input-question";

@Component({
  selector: "mainio-form-number-input",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.css"]
})
export class NumberInputComponent extends FormFieldBaseComponent {
  @Input()
  question: NumberInputQuestion;

  constructor() {
    super();
  }

  ngOnInit() {}
}
