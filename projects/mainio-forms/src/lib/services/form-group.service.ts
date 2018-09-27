import { Injectable } from "@angular/core";
import { QuestionBase } from "../models/question-base";
import { FormGroup, FormControl } from "@angular/forms";
import { Form, ControlType } from "../models";
import { Observable } from "rxjs";
import { LibraryLoggerService } from "./library-logger.service";
import { IQuestionBaseOptions } from "../interfaces/i-question-base-options";
import { QuestionCreatorService } from "./question-creator.service";

@Injectable({
  providedIn: "root"
})
export class FormGroupService {
  constructor(
    private _log: LibraryLoggerService,
    private _creator: QuestionCreatorService
  ) {}

  public InitializeGroup(
    questions: IQuestionBaseOptions[],
    values: { [key: string]: any }
  ): FormGroup {
    let group: any = {};
    if (!questions) {
      return new FormGroup(group);
    }
    try {
      questions.forEach(question => {
        let q = this._creator.createQuestionFromControlType(
          question.controlType,
          question
        );
        group[question.key] = new FormControl(
          {
            value: this.getValueFromValues(q, values),
            disabled: question.disabled
          },
          q.getValidators()
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
