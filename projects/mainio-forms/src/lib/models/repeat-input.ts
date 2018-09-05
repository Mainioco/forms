import { IRepeatInputOptions } from "../interfaces/i-repeat-input-options";
import { InputQuestion } from "./input-question";
import { ControlType } from "./control-type.enum";
import { QuestionBase } from "./question-base";
import * as Forms from "@angular/forms";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validateNoSameValuesValidator } from "../validators/validator-no-same-values";

export class RepeatInput extends QuestionBase<string> {
  controlType = ControlType.RepeatInput;
  type: string;
  minLength: number = undefined;
  maxLength: number = undefined;
  suffix: string;
  prefix: string;
  repeatTimes: number;
  allowSameValues: boolean;
  _placeholders: string[];
  _value: string[];

  constructor(options: IRepeatInputOptions = { repeatTimes: 1 }) {
    super(options);
    this.value = options.value || [];
    this.type = options.type || "";
    this.minLength = options.minLength || -1;
    this.maxLength = options.maxLength || -1;
    this.suffix = options.suffix || "";
    this.prefix = options.prefix || "";
    this.repeatTimes = options.repeatTimes || 1;
    this.placeholders = options.placeholders || [options.label || ""];
    this.allowSameValues = options.allowSameValues;
  }

  get value(): string | string[] {
    return this._value;
  }

  set value(val: string | string[]) {
    if (typeof val === "string") {
      let x = val as string;
      if (!x.startsWith("[")) {
        this._value = JSON.parse("[" + x + "]");
      } else {
        this._value = JSON.parse(x);
      }
      return;
    }
    this._value = val;
  }

  get placeholders(): string | string[] {
    return this._placeholders;
  }

  set placeholders(vals: string | string[]) {
    if (typeof vals === "string") {
      let x = vals as string;
      if (!x.startsWith("[")) {
        this._placeholders = JSON.parse("[" + x + "]");
      } else {
        this._placeholders = JSON.parse(x);
      }
      return;
    }
    this._placeholders = vals;
  }

  getPlaceholderByIndex(index: number) {
    if (
      !this._placeholders ||
      index < 0 ||
      this._placeholders.length <= index
    ) {
      return "";
    }
    return this._placeholders[index];
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
    if (!this.allowSameValues && this.repeatTimes > 1) {
      exist.push(validateNoSameValuesValidator);
    }
    return exist;
  }
}
