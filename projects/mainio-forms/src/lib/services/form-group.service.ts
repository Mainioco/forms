import { Injectable } from "@angular/core";
import { QuestionBase } from "../models/question-base";
import { FormGroup, FormControl } from "@angular/forms";
import { Form, ControlType } from "../models";
import { Observable } from "rxjs";
import { LibraryLoggerService } from "./library-logger.service";

@Injectable({
  providedIn: "root"
})
export class FormGroupService {
  constructor(private _log: LibraryLoggerService) {}

  public InitializeGroup(
    questions: QuestionBase<any>[],
    values: { [key: string]: any }
  ): FormGroup {
    let group: any = {};
    if (!questions) {
      return new FormGroup(group);
    }
    try {
      questions.forEach(question => {
        group[question.key] = new FormControl(
          {
            value: this.getValueFromValues(question, values),
            disabled: question.disabled
          },
          question.getValidators()
        );
      });
    } catch (ex) {
      this._log.error(ex);
    }
    return new FormGroup(group);
  }

  getValueFromValues(
    question: QuestionBase<any>,
    values: { [key: string]: any }
  ) {
    if (values) {
      let vals = values ? Object.keys(values) : [];
      if (vals.find(x => x == question.key)) {
        if (question.controlType === ControlType.Date) {
          return new Date(values[question.key]);
        }
        return values[question.key];
      }
    }
    return question.value || "";
  }
}
