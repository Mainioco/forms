import {
  Component,
  Input,
  AfterContentInit,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { InputQuestion } from "../../../models/input-question";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";

@Component({
  selector: "mainio-form-single-line-input",
  templateUrl: "./single-line-input.component.html",
  styleUrls: ["./single-line-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleLineInputComponent extends FormFieldBaseComponent {
  @Input()
  question: InputQuestion;

  minLength: number = 0;
  maxLength: number = 0;
  inputHint: string = "";

  private isInitialized: boolean = false;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.suffix = this.question.suffix;
    this.prefix = this.question.prefix;
    this.inputHint = this.lengthDisplayers;
  }
  get currentValueLength(): number {
    if (!this.question || !this.question.value) {
      return 0;
    }
    return this.question.value.length;
  }

  get lengthDisplayers() {
    this.minLength =
      this.getQuestion<InputQuestion>().minLength > 0
        ? this.getQuestion<InputQuestion>().minLength
        : -1;
    this.maxLength =
      this.getQuestion<InputQuestion>().maxLength >=
      this.getQuestion<InputQuestion>().minLength
        ? this.getQuestion<InputQuestion>().maxLength
        : this.getQuestion<InputQuestion>().minLength;
    if (this.maxLength <= 0) {
      this.maxLength = -1;
    }
    this.inputHint = "";
    if (this.minLength > 0) {
      this.inputHint +=
        this.currentValueLength > this.minLength
          ? this.currentValueLength
          : this.minLength;
    }
    this.inputHint +=
      this.minLength > 0 && this.maxLength > this.minLength ? "/" : "";
    this.inputHint +=
      this.maxLength && this.maxLength > this.minLength ? this.maxLength : "";
    return this.inputHint;
  }
}
