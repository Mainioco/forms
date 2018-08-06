import { IQuestionBaseOptions } from "./i-question-base-options";
import { IOptionGroup, IOptions } from "../models/drop-down-search";

export interface IDropdownOptions extends IQuestionBaseOptions {
  options?: Array<IOptions>;
  groups?: Array<IOptionGroup>;
}
