import { IQuestionBaseOptions } from "./i-question-base-options";

export interface INumberInputQuestionOptions extends IQuestionBaseOptions {
  minLength?: number;
  maxLength?: number;
  suffix?: string;
}
