import { Action } from "@ngrx/store";

import { QuestionBase } from "../../models/question-base";
import { Form } from "../../models/form";

export enum MainioFormActionTypes {
  ValueChanges = "[MainioForm][Actions] ValueChanged",
  ValueReset = "[MainioForm][Actions] ValueReset"
}

export class ValueChanged implements Action {
  readonly type = MainioFormActionTypes.ValueChanges;

  constructor(public payload: { form: Form; oldValues: any; newValues: any }) {}
}

export class ValueReset implements Action {
  readonly type = MainioFormActionTypes.ValueReset;

  constructor(public payload: { form: Form; oldValues: any; newValues: any }) {}
}

export type FormActions = ValueChanged | ValueReset;
