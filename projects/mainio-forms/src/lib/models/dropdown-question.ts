import { QuestionBase } from "./question-base";
import { IOptionGroup, IOptions } from "./drop-down-search";
import { ControlType } from "./control-type.enum";
import { IDropdownOptions } from "../interfaces";
export class DropdownQuestion extends QuestionBase<string> {
  controlType = ControlType.Dropdown;
  public _selection: string;
  options: Array<IOptions> = [];
  groups: IOptionGroup[];
  constructor(options: IDropdownOptions = {}) {
    super(options);
    this.options = options.options;
    this.groups = options.groups;
  }

  getSelected(): IOptions {
    if (this.options) {
      let x = this.options.find(x => x.key === this._selection);
      if (x) {
        return x;
      }
    }
    if (this.groups) {
      for (let group of this.groups) {
        if (!group.options) {
          continue;
        }
        let x = group.options.find(x => x.key === this._selection);
        if (x) {
          return x;
        }
      }
    }
    return {
      key: "",
      label: "",
      value: ""
    };
  }

  set selected(value: IOptions | string) {
    if (!value && value !== "0") {
      this.value = undefined;
      this._selection = undefined;
      return;
    }
    this._selection = this.getDesignatedSetValue(value);
    this.value = this.options.find(
      x => x.key === this.getDesignatedSetValue(value)
    )
      ? this.options.find(x => x.key === this.getDesignatedSetValue(value))
          .value
      : undefined;
    let a = undefined;

    if (this.value) {
      return;
    }
    for (let group of this.groups) {
      if (!group.options) {
        continue;
      }
      let x = group.options.find(
        x => x.key === this.getDesignatedSetValue(value)
      );
      if (x) {
        this.value = x.key;
        a = x;
        break;
      }
    }
    return;
  }

  private getDesignatedSetValue(value: IOptions | string) {
    if (typeof value === "string") {
      return value;
    }
    return value.key;
  }
}
