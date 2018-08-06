import { QuestionBase } from "./question-base";
import { IDropdownSearchOptions } from "../interfaces/i-dropdown-search-options";

export interface IOptions {
  key: string;
  value: string;
  label: string;
}

export interface IOptionGroup {
  groupName: string;
  groupId: string;
  options: Array<IOptions>;
}

export class DropdownSearchQuestion extends QuestionBase<string> {
  controlType = "dropdown-search";
  options: Array<IOptionGroup>;
  private _selection: string;
  private _searchFilter: string;

  constructor(options: IDropdownSearchOptions = {}) {
    super(options);
    this.options = options.options || [];
  }

  get selected() {
    return this._selection;
  }

  set selected(value) {
    this._selection = value;
    let a = undefined;
    if (value !== undefined) {
      for (let group of this.options) {
        if (!group.options) {
          continue;
        }
        let x = group.options.find(x => x.value === value);
        if (x) {
          this.value = x.value;
          a = x;
          break;
        }
      }
      return;
    }
  }
}
