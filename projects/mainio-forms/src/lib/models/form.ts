import { QuestionBase } from "./question-base";
import { FormGroup } from "@angular/forms";

export interface QuestionGroup {
  group: string;
  questions: QuestionBase<any>[];
  formGroup: FormGroup;
}

export class Form {
  public id: string;
  public questionGroups: QuestionGroup[];
  public questions: QuestionBase<any>[];
}
