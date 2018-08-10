import { Injectable } from '@angular/core';
import { QuestionBase } from '../models/question-base';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {

  constructor() { }

  public InitializeGroup(questions: QuestionBase<any>[]):FormGroup
  {
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
