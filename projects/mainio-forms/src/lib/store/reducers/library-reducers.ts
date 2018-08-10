import {
  LibraryActions,
  MainioLibraryActionTypes
} from "../actions/library-actions";
import { Form } from "../../models/form";

export interface LibraryState {
  debugMode: boolean;
  forms: Array<Form>;
}

export const mainioFormsLibraryInitialState: LibraryState = {
  debugMode: false,
  forms: []
};

export function libraryReducer(
  state = mainioFormsLibraryInitialState,
  action: LibraryActions
): LibraryState {
  switch (action.type) {
    case MainioLibraryActionTypes.SetDebugMode: {
      return {
        ...state,
        debugMode: action.payload.debugMode
      };
    }

    default:
      break;
  }
  return state;
}

export const debugMode = (state: LibraryState) => state.debugMode;
