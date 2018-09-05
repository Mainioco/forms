import { IInputQuestionOptions } from "./i-input-question-options";
import { IQuestionBaseOptions } from "./i-question-base-options";

export interface IRepeatInputOptions extends IQuestionBaseOptions {
  value?: string | string[];
  type?: string;
  minLength?: number;
  maxLength?: number;
  suffix?: string;
  prefix?: string;
  repeatTimes?: number;
  placeholders?: string | string[];
  allowSameValues?: boolean;
}
