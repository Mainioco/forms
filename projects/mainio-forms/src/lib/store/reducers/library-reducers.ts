import {
  LibraryActions,
  MainioLibraryActionTypes
} from "../actions/library-actions";
import { Form } from "../../models/form";

export interface State {
  debugMode: boolean;
  forms: Array<Form>;
}

export const initialState: State = {
  debugMode: false,
  forms: []
};

export function reducer(state = initialState, action: LibraryActions): State {
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

export const debugMode = (state: State) => state.debugMode;
