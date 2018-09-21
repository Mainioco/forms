import { IQuestionBaseOptions } from "./i-question-base-options";
import { IOptionGroup } from "./i-option-group";

export interface IDropdownSearchOptions extends IQuestionBaseOptions {
  options?: Array<IOptionGroup>;
}
