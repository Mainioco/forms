import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../models/question-base";
import {
  DropdownSearchQuestion,
  IOptions,
  IOptionGroup
} from "../models/drop-down-search";
import { Observable, Subject } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { DropdownQuestion } from "../models/dropdown-question";
import { ControlType } from "../models/control-type.enum";

@Component({
  selector: "mainio-form-question",
  styleUrls: ["./dynamic-form-question.component.css"],
  templateUrl: "./dynamic-form-question.component.html"
})
export class DynamicFormQuestionComponent {
  @Input() compactStyle: boolean;
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get controlTypeString() {
    switch (this.question.controlType) {
      case ControlType.Dropdown:
        return "dropdown";
      case ControlType.DropdownSearch:
        return "dropdown-search";
      default:
        return "input";
    }
  }
}
