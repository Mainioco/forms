import { ControlType } from "../models/control-type.enum";
import * as Forms from "@angular/forms";

export interface IQuestionBaseOptions {
  value?: any;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: ControlType;
  group?: string;
  disabled?: boolean;
  hidden?: boolean;
  customValidators?: ((
    control: Forms.AbstractControl
  ) => Forms.ValidationErrors)[];
}
