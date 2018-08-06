import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { QuestionBase } from "./models/question-base";

@Injectable()
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    if (!questions) {
      return new FormGroup(group);
    }
    questions.forEach(question => {
      group[question.key] = new FormControl(
        question.value || "",
        question.getValidators()
      );
    });
    return new FormGroup(group);
  }
}
