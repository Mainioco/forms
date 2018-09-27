import { Action } from "@ngrx/store";

import { QuestionBase } from "../../models/question-base";
import { Form } from "../../models/form";
import { QuestionGroup } from "../../models/question-group";
import { FormGroup } from "@angular/forms";
import { ILoadedValues } from "../../interfaces";

export enum MainioLifecycleActionTypes {
  Created = "[MainioForm][Lifecycle] Created",
  Destroyed = "[MainioForm][Lifecycle] Destroyed",
  QuestionsUpdated = "[MainioForm][Lifecycle] QuestionsUpdated",
  FormGroupCreated = "[MainioForm][Actions] FormGroupCreated",
  FormGroupDeleted = "[MainioForm][Actions] FormGroupDeleted",
  ValueChanges = "[MainioForm][Actions] ValueChanged",
  ValueReset = "[MainioForm][Actions] ValueReset",
  ClearValues = "[MainioForm][Actions] ClearValues",
  LoadedValues = "[MainioForm][Actions] LoadedValues",
  SaveValues = "[MainioForm][Actions] SaveValues",
  EffectRun = "EffectRun",
  UpdateMappedModel = "[MainioForm][Actions]UpdateMappedModel",
  ClearMappedModel = "[MainioForm][Actions]ClearMappedModel"
}

export class ClearMappedModelAction implements Action {
  readonly type = MainioLifecycleActionTypes.ClearMappedModel;

  constructor(
    public payload: { formId: string; model: any; modelIdentifier?: string }
  ) {}
}
export class UpdateMappedModelAction implements Action {
  readonly type = MainioLifecycleActionTypes.UpdateMappedModel;

  constructor(
    public payload: { formId: string; model: any; modelIdentifier?: string }
  ) {}
}
export class LoadedValuesAction implements Action {
  readonly type = MainioLifecycleActionTypes.LoadedValues;

  constructor(public payload: { form: Form; values: ILoadedValues }) {}
}
export class SaveValuesAction implements Action {
  readonly type = MainioLifecycleActionTypes.SaveValues;

  constructor(public payload: Form) {}
}

export class ClearValuesAction implements Action {
  readonly type = MainioLifecycleActionTypes.ClearValues;

  constructor(public payload: Form) {}
}

export class EffectRun implements Action {
  readonly type = MainioLifecycleActionTypes.EffectRun;
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

  constructor(
    public payload: {
      formId: string;
      newValues: any;
      groupIsValid: boolean;
      groupId: string;
      modelType?: string;
    }
  ) {}
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
  | ValueReset
  | EffectRun
  | ClearValuesAction
  | SaveValuesAction
  | LoadedValuesAction
  | UpdateMappedModelAction
  | ClearMappedModelAction;
