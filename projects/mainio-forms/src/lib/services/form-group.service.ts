import { Injectable } from "@angular/core";
import { QuestionBase } from "../models/question-base";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class FormGroupService {
  constructor() {}

  public InitializeGroup(
    questions: QuestionBase<any>[],
    values: { [key: string]: any }
  ): FormGroup {
    let group: any = {};
    if (values) {
      for (let x of Object.keys(values)) {
        let q = questions.find(y => y.key == x);
        if (!q) continue;
        q.setValue(values[x]);
      }
    }
    if (!questions) {
      return new FormGroup(group);
    }
    try {
      questions.forEach(question => {
        group[question.key] = new FormControl(
          { value: question.value || "", disabled: question.disabled },
          question.getValidators()
        );
      });
    } catch (ex) {
      console.error(ex);
    }
    return new FormGroup(group);
  }
}
