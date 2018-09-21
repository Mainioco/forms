import { IQuestionBaseOptions } from "./i-question-base-options";
import { IOptions } from "./i-options";
import { IOptionGroup } from "./i-option-group";

export interface IDropdownOptions extends IQuestionBaseOptions {
  options?: Array<IOptions>;
  groups?: Array<IOptionGroup>;
}
