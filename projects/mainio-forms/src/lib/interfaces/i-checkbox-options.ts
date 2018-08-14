import { IQuestionBaseOptions } from "./i-question-base-options";

export interface ICheckboxOptions extends IQuestionBaseOptions {
  enabled?: boolean;
  suffix?: string;
  prefix?: string;
}
