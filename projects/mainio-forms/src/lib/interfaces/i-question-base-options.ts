import { ControlType } from "../models/control-type.enum";

export interface IQuestionBaseOptions {
  value?: any;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: ControlType;
  group?: string;
  disabled?: boolean;
}
