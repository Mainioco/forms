import { IQuestionBaseOptions } from "./i-question-base-options";

export interface INumberInputQuestionOptions extends IQuestionBaseOptions {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  suffix?: string;
  prefix?: string;
}
