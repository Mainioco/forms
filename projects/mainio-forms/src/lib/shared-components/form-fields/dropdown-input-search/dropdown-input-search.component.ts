import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../../../models/question-base";
import {
  DropdownSearchQuestion,
  IOptions,
  IOptionGroup
} from "../../../models/drop-down-search";
import { Subject } from "rxjs";
import { startWith, map } from "rxjs/operators";

export const _filter = (opt: any[], value: IOptions | string): IOptions[] => {
  const filterValue =
    typeof value === "object" ? value.label.toLowerCase() : value.toLowerCase();
  return opt.filter(
    item => item.label.toLowerCase().indexOf(filterValue) === 0
  );
};

@Component({
  selector: "mainio-form-dropdown-input-search",
  templateUrl: "./dropdown-input-search.component.html",
  styleUrls: ["./dropdown-input-search.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownInputSearchComponent implements OnInit, OnChanges {
  @Input()
  question: DropdownSearchQuestion;
  @Input()
  formGroup: FormGroup;
  stateGroupOptions: Subject<IOptionGroup[]> = new Subject<IOptionGroup[]>();
  selectedOption: string = "";
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.formGroup
      .get(this.question.key)!
      .valueChanges.pipe(
        startWith<string | IOptions>(""),
        map(value => (typeof value === "string" ? value : value.label)),
        map(
          value =>
            value
              ? this._filterGroup(value)
              : (this.question as DropdownSearchQuestion).options.slice()
        )
      )
      .subscribe(x => {
        setTimeout(() => {
          this.stateGroupOptions.next(x);
        }, 100);
      });
  }

  changeAdvancedSelect(key, event) {
    (this.question as DropdownSearchQuestion).selected = event;
  }
  isSelected(option: IOptions, question: DropdownSearchQuestion): string {
    return option.key == question.selected ? "selected" : "";
  }
  displayFn(user?: IOptions): string | undefined {
    return user ? user.label : undefined;
  }

  private _filterGroup(value: IOptions | string): any[] {
    if (value) {
      let a = this.question;
      if (a.options.length > 0) {
        let x: IOptionGroup[] = a.options
          .map(group => ({
            groupId: group.groupName,
            groupName: group.groupName,
            options: _filter(group.options, value)
          }))
          .filter(group => group.options.length > 0);
        return x;
      }
    }

    return (this.question as DropdownSearchQuestion).options;
  }
}
