import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../question-base";
import {
  DropdownSearchQuestion,
  IOptions,
  IOptionGroup
} from "../drop-down-search";
import { Observable, Subject } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { DropdownQuestion } from "../dropdown-question";

@Component({
  selector: "app-question",
  styleUrls: ["./dynamic-form-question.component.css"],
  templateUrl: "./dynamic-form-question.component.html"
})
export class DynamicFormQuestionComponent {
  @Input() compactStyle: boolean;
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    if (!this.form.controls[this.question.key]) {
      return false;
    }
    return this.form.controls[this.question.key].valid;
  }
}
