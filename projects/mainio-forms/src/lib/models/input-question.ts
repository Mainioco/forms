import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";

export class InputQuestion extends QuestionBase<string> {
  controlType = "input";
  type: string;
  minLength: number = -1;
  maxLength: number = -1;
  constructor(options: {} = {}) {
    super(options);
    this.type = options["type"] || "";
    this.minLength = options["minLength"] || -1;
    this.maxLength = options["maxLength"] || -1;
  }

  getValidators() {
    if (this.validators) {
      return this.validators;
    }
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
    return (this.validators = exist);
  }
}
