import {
  MainioLifecycleActionTypes,
  LifecycleActions
} from "../actions/form-lifecycle-actions";
import { Form } from "../../models/form";

export interface State {
  debugMode: boolean;
  forms: Array<Form>;
}

export const initialState: State = {
  debugMode: false,
  forms: []
};

export function reducer(state = initialState, action: LifecycleActions): State {
  switch (action.type) {
    case MainioLifecycleActionTypes.Created: {
      if (hasForm(action.payload, state.forms)) {
        break;
      }
      let newForms = [...state.forms, action.payload];
      return {
        ...state,
        forms: newForms
      };
    }

    case MainioLifecycleActionTypes.Destroyed: {
      let index = findIndexForForm(action.payload, state);
      if (index === -1) {
        break;
      }
      let newForms = [...state.forms];
      newForms.splice(index, 1);
      return {
        ...state,
        forms: newForms
      };
    }

    case MainioLifecycleActionTypes.QuestionsUpdated: {
      let index = findIndexForForm(action.payload.form, state);
      if (index === -1) {
        break;
      }
      let newForms = [...state.forms];
      newForms[index].questions = action.payload.newQuestions;
      return {
        ...state,
        forms: newForms
      };
    }

    case MainioLifecycleActionTypes.FormGroupCreated: {
      let index = findIndexForForm(action.payload.form, state);
      if (index === -1) {
        break;
      }
      let newForms = [...state.forms];
      newForms[index].questionGroups = [
        ...newForms[index].questionGroups,
        action.payload.formGroup
      ];
      return {
        ...state,
        forms: newForms
      };
    }

    case MainioLifecycleActionTypes.FormGroupDeleted: {
      let index = findIndexForForm(action.payload.form, state);
      if (index === -1) {
        break;
      }
      let newForms = [...state.forms];
      newForms[index].questionGroups = newForms[index].questionGroups.filter(
        x => x !== action.payload.formGroup
      );
      return {
        ...state,
        forms: newForms
      };
    }
    default:
      break;
  }
  return state;
}

export const getForms = (state: State) => state.forms;
export const getForm = (state: State, id: string) =>
  state.forms.find(x => x.id === id);
export const getFormQuestions = (state: State, id: string) =>
  state.forms.find(x => x.id === id)
    ? state.forms.find(x => x.id === id).questions
    : [];

function findIndexForForm(form: Form, state: State = initialState) {
  let x = state.forms.find(x => x.id === form.id);
  if (!x) {
    return -1;
  }
  return state.forms.indexOf(x);
}
function hasForm(form: Form, formArr: Form[]): boolean {
  let x = formArr.find(x => x.id === form.id);
  return !!x;
}
