import { QuestionBase } from "./question-base";
import { ControlType } from "./control-type.enum";
import { IDropdownOptions } from "../interfaces";
import { IOptions } from "../interfaces/i-options";
import { IOptionGroup } from "../interfaces/i-option-group";

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

  set selected(value: IOptions | string | number) {
    if (!value && value !== "0" && value !== 0) {
      this.value = undefined;
      this._selection = undefined;
      return;
    }
    this._selection = this.getDesignatedSetValue(value).toString();
    this.value = undefined;
    if (this.options) {
      this.value = this.options.find(
        x => x.key === this.getDesignatedSetValue(value)
      )
        ? this.options.find(x => x.key === this.getDesignatedSetValue(value))
            .value
        : undefined;
    }
    if (this.value) {
      return;
    }
    if (this.groups) {
      for (let group of this.groups) {
        if (!group.options) {
          continue;
        }
        let x = group.options.find(
          x => x.key === this.getDesignatedSetValue(value)
        );
        if (x) {
          this.value = x.key;
          break;
        }
      }
    }
  }

  private getDesignatedSetValue(value: IOptions | string | number) {
    if (typeof value === "string") {
      return value;
    } else if (typeof value === "number") {
      return value;
    }
    return value.key ? value.key : "";
  }
}
