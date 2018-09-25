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
  customRegExpValidators: string[];
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
    this.customRegExpValidators = options.customRegExpValidators || [];
  }

  getValidators(): ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[] {
    let toAdd = this.customValidators ? this.customValidators : [];

    if (this.customRegExpValidators && this.customRegExpValidators.length > 0) {
      this.customRegExpValidators
        .filter(x => !!x)
        .forEach(x => toAdd.push(Forms.Validators.pattern(x)));
    }
    if (this.required) {
      return [Forms.Validators.required, ...toAdd];
    }
    return [...toAdd];
  }

  setValue(val: any) {
    this.value = val;
  }
}
