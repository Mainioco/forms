import { IQuestionBaseOptions } from "./i-question-base-options";

export interface ISliderOptions extends IQuestionBaseOptions {
  isRange?: boolean;
  values?: number[] | number;
  min?: number;
  max?: number;
}
