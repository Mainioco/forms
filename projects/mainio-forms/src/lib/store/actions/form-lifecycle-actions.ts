import { Action } from "@ngrx/store";

import { QuestionBase } from "../../models/question-base";
import { Form, QuestionGroup } from "../../models/form";
import { FormGroup } from "@angular/forms";

export enum MainioLifecycleActionTypes {
  Created = "[MainioForm][Lifecycle] Created",
  Destroyed = "[MainioForm][Lifecycle] Destroyed",
  QuestionsUpdated = "[MainioForm][Lifecycle] QuestionsUpdated",
  FormGroupCreated = "[MainioForm][Actions] FormGroupCreated",
  FormGroupDeleted = "[MainioForm][Actions] FormGroupDeleted"
}

export class Created implements Action {
  readonly type = MainioLifecycleActionTypes.Created;

  constructor(public payload: Form) {}
}

export class Destroyed implements Action {
  readonly type = MainioLifecycleActionTypes.Destroyed;

  constructor(public payload: Form) {}
}

export class QuestionsUpdated implements Action {
  readonly type = MainioLifecycleActionTypes.QuestionsUpdated;

  constructor(
    public payload: { form: Form; newQuestions: QuestionBase<any>[] }
  ) {}
}

export class FormGroupCreated implements Action {
  readonly type = MainioLifecycleActionTypes.FormGroupCreated;

  constructor(public payload: { form: Form; formGroup: QuestionGroup }) {}
}

export class FormGroupDeleted implements Action {
  readonly type = MainioLifecycleActionTypes.FormGroupDeleted;
  constructor(public payload: { form: Form; formGroup: QuestionGroup }) {}
}
export type LifecycleActions =
  | Created
  | Destroyed
  | QuestionsUpdated
  | FormGroupCreated
  | FormGroupDeleted;
