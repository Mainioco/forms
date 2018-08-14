import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";
import { IInputQuestionOptions } from "../interfaces/i-input-question-options";
import { ControlType } from "./control-type.enum";

export class InputQuestion extends QuestionBase<string> {
  controlType = ControlType.Input;
  type: string;
  minLength: number = undefined;
  maxLength: number = undefined;
  suffix: string;
  prefix: string;

  constructor(options: IInputQuestionOptions = {}) {
    super(options);
    this.type = options.type || "";
    this.minLength = options.minLength || -1;
    this.maxLength = options.maxLength || -1;
    this.suffix = options.suffix || "";
    this.prefix = options.prefix || "";
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
