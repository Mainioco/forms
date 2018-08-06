import { IQuestionBaseOptions } from "./i-question-base-options";

export interface IInputQuestionOptions extends IQuestionBaseOptions {
  type?: string;
  minLength?: number;
  maxLength?: number;
}
