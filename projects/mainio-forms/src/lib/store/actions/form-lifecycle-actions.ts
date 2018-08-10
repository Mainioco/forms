import { Action } from "@ngrx/store";

import { QuestionBase } from "../../models/question-base";
import { Form } from "../../models/form";
import { QuestionGroup } from "../../models/question-group";
import { FormGroup } from "@angular/forms";

export enum MainioLifecycleActionTypes {
  Created = "[MainioForm][Lifecycle] Created",
  Destroyed = "[MainioForm][Lifecycle] Destroyed",
  QuestionsUpdated = "[MainioForm][Lifecycle] QuestionsUpdated",
  FormGroupCreated = "[MainioForm][Actions] FormGroupCreated",
  FormGroupDeleted = "[MainioForm][Actions] FormGroupDeleted",
  ValueChanges = "[MainioForm][Actions] ValueChanged",
  ValueReset = "[MainioForm][Actions] ValueReset"
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

export class ValueChanged implements Action {
  readonly type = MainioLifecycleActionTypes.ValueChanges;

  constructor(public payload: { formId: string; newValues: any }) {}
}

export class ValueReset implements Action {
  readonly type = MainioLifecycleActionTypes.ValueReset;

  constructor(public payload: { form: Form }) {}
}

export type LifecycleActions =
  | Created
  | Destroyed
  | QuestionsUpdated
  | FormGroupCreated
  | FormGroupDeleted
  | ValueChanged
  | ValueReset;
