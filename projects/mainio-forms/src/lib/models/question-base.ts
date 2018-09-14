import * as Forms from "@angular/forms";
import { IQuestionBaseOptions } from "../interfaces/i-question-base-options";
import { ControlType } from "./control-type.enum";

export class QuestionBase<T> {
  public value: any;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: ControlType;
  group: string;
  disabled: boolean;
  customValidators: ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[];
  hidden: boolean;
  constructor(options: IQuestionBaseOptions = {}) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || ControlType.Default;
    this.group = options.group || "";
    this.disabled = options.disabled;
    this.customValidators = options.customValidators || undefined;
    this.hidden = options.hidden;
  }

  getValidators(): ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[] {
    if (this.required) {
      let toAdd = this.customValidators ? this.customValidators : [];
      return [Forms.Validators.required, ...toAdd];
    }
    return this.customValidators ? [...this.customValidators] : [];
  }

  setValue(val: T) {
    this.value = val;
  }
}
