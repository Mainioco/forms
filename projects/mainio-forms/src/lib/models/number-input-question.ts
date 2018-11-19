import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";
import { ControlType } from "./control-type.enum";
import { INumberInputQuestionOptions } from "../interfaces/i-number-input-question-options";

export class NumberInputQuestion extends QuestionBase<number> {
  controlType = ControlType.NumberInput;
  type: string;
  minLength: number = -1;
  maxLength: number = -1;
  min: number;
  max: number;
  suffix: string;
  prefix: string;

  constructor(options: INumberInputQuestionOptions = {}) {
    super(options);
    this.type = "number";
    this.suffix = options.suffix || "";
    this.prefix = options.prefix || "";
    this.min = options.min;
    this.max = options.max;
  }

  getValidators() {
    let exist = super.getValidators();
    var re = new RegExp("^-?\\d{1,9}");
    exist.push(Forms.Validators.pattern(re));
    if (this.min !== undefined) {
      exist.push(Forms.Validators.min(this.min));
    }
    if (this.max !== undefined) {
      exist.push(Forms.Validators.max(this.max));
    }
    return exist;
  }
}
