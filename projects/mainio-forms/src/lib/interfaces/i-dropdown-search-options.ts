import { IQuestionBaseOptions } from "./i-question-base-options";
import { IOptionGroup } from "../models/drop-down-search";

export interface IDropdownSearchOptions extends IQuestionBaseOptions {
  options?: Array<IOptionGroup>;
}
