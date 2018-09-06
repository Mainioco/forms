import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";
import { ControlType } from "./control-type.enum";
import { INumberInputQuestionOptions } from "../interfaces/i-number-input-question-options";
import { ICheckboxOptions } from "../interfaces/i-checkbox-options";

export class CheckboxQuestion extends QuestionBase<boolean> {
  controlType = ControlType.CheckBox;
  get enabled(): boolean {
    return this.value;
  }
  set enabled(value) {
    this.value = !value ? false : true;
  }
  suffix: string;
  prefix: string;
  constructor(options: ICheckboxOptions = {}) {
    super(options);
    this.enabled = options.enabled;
    this.suffix = options.suffix || "";
    this.prefix = options.prefix || "";
  }
}
