import { IQuestionBaseOptions } from "./i-question-base-options";

export interface INumberInputQuestionOptions extends IQuestionBaseOptions {
  min?: number;
  max?: number;
  suffix?: string;
  prefix?: string;
}
