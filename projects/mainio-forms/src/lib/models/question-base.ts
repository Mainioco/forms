import * as Forms from "@angular/forms";
export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  validators: ((control: Forms.AbstractControl) => Forms.ValidationErrors)[];
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
  }

  getValidators(): ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[] {
    if (this.required) {
      return [Forms.Validators.required];
    }
    return [];
  }
}
