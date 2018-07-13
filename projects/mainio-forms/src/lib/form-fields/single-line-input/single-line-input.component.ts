import {
  Component,
  Input,
  AfterContentInit,
  OnChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { InputQuestion } from "../../input-question";

@Component({
  selector: "mainio-form-single-line-input",
  templateUrl: "./single-line-input.component.html",
  styleUrls: ["./single-line-input.component.css"]
})
export class SingleLineInputComponent implements AfterContentInit, OnChanges {
  @Input() question: InputQuestion;
  @Input() formGroup: FormGroup;
  minLength: number = 0;
  maxLength: number = 0;
  inputHint: string = "";

  private isInitialized: boolean = false;

  constructor() {}

  get currentValueLength(): number {
    if (!this.question || !this.question.value) {
      return 0;
    }
    return this.question.value.length;
  }
  ngAfterContentInit() {}
  increaseMin() {
    this.minLength += 1;
  }
  ngOnChanges() {}

  get lengthDisplayers() {
    this.minLength = this.question.minLength > 0 ? this.question.minLength : -1;
    this.maxLength =
      this.question.maxLength >= this.question.minLength
        ? this.question.maxLength
        : this.question.minLength;
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
