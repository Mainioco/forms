import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { NumberInputQuestion } from "../../../models/number-input-question";

@Component({
  selector: "mainio-form-number-input",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent extends FormFieldBaseComponent {
  @Input()
  question: NumberInputQuestion;

  constructor() {
    super();
  }

  ngOnInit() {}
}
