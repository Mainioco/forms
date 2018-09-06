import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { DateQuestion } from "../../../models/date-question";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { AbstractControl } from "@angular/forms";

@Component({
  selector: "mainio-form-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent extends FormFieldBaseComponent {
  @Input()
  question: DateQuestion;
  @Input()
  controller: AbstractControl;
  constructor() {
    super();
  }

  ngOnInit() {}
}
