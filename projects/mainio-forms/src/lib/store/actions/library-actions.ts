import { Action } from "@ngrx/store";

export enum MainioLibraryActionTypes {
  SetDebugMode = "[MainioForm][LibraryActions] SetDebugMode"
}

export class SetDebugMode implements Action {
  readonly type = MainioLibraryActionTypes.SetDebugMode;

  constructor(public payload: { debugMode: boolean }) {}
}

export type LibraryActions = SetDebugMode;
