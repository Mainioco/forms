import * as Forms from "@angular/forms";
import { IQuestionBaseOptions } from "../interfaces/i-question-base-options";
import { ControlType } from "./control-type.enum";

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: ControlType;
  group: string;
  validators: ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[] = [];
  constructor(options: IQuestionBaseOptions = {}) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || ControlType.Default;
    this.group = options.group;
  }

  resetValidators() {
    this.validators = [];
    this.validators = this.getValidators();
  }
  getValidators(): ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[] {
    if (this.validators.length > 0) {
      return this.validators;
    }
    if (this.required) {
      return [Forms.Validators.required];
    }
    return [];
  }
}
