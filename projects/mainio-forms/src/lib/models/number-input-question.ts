import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";
import { ControlType } from "./control-type.enum";
import { INumberInputQuestionOptions } from "../interfaces/i-number-input-question-options";

export class InputQuestion extends QuestionBase<number> {
  controlType = ControlType.Input;
  type: string;
  minLength: number = -1;
  maxLength: number = -1;
  suffix: string;

  constructor(options: INumberInputQuestionOptions = {}) {
    super(options);
    this.type = "number";
    this.minLength = options.minLength || -1;
    this.maxLength = options.maxLength || -1;
    this.suffix = options.suffix || "";
  }

  getValidators() {
    let exist = super.getValidators();
    if (this.minLength > -1) {
      exist.push(Forms.Validators.minLength(this.minLength));
    }
    if (this.maxLength > -1) {
      exist.push(Forms.Validators.maxLength(this.maxLength));
    }
    if (this.type === "number") {
      var re = new RegExp("^-?\\d{1,9}");
      exist.push(Forms.Validators.pattern(re));
    }
    return exist;
  }
}
