import {
  MainioLifecycleActionTypes,
  LifecycleActions
} from "../actions/form-lifecycle-actions";
import { QuestionBase } from "../../models/question-base";
import { Form, QuestionGroup } from "../../models/form";
import { FormGroup } from "@angular/forms";

export interface State {
  debugMode: boolean;
  forms?: { id: string; form: Form };
}

export const initialState: State = {
  debugMode: false,
  forms: undefined
};

export function reducer(state = initialState, action: LifecycleActions): State {
  switch (action.type) {
    case MainioLifecycleActionTypes.Created: {
      if (hasForm(action.payload, state)) {
        break;
      }
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: action.payload
        }
      };
    }

    case MainioLifecycleActionTypes.Destroyed: {
      if (hasForm(action.payload, state)) {
        break;
      }
      delete state.forms[action.payload.id];
      return {
        ...state,
        forms: state.forms
      };
    }

    case MainioLifecycleActionTypes.QuestionsUpdated: {
      if (!hasForm(action.payload.form, state)) {
        break;
      }
      return {
        ...state,
        [action.payload.form.id]: {
          ...action.payload.form,
          questions: action.payload.newQuestions
        }
      };
    }

    case MainioLifecycleActionTypes.FormGroupCreated: {
      if (!hasForm(action.payload.form, state)) {
        break;
      }
      return {
        ...state,
        [action.payload.form.id]: {
          ...action.payload.form,
          questionGroups: state.forms[
            action.payload.form.id
          ].questionGroups.map((x: QuestionGroup) => {
            return x.group === action.payload.formGroup.group
              ? {
                  ...action.payload.formGroup
                }
              : x;
          })
        }
      };
    }

    case MainioLifecycleActionTypes.FormGroupDeleted: {
      if (!hasForm(action.payload.form, state)) {
        break;
      }
      return {
        ...state,
        [action.payload.form.id]: {
          ...action.payload.form,
          questionGroups: state.forms[
            action.payload.form.id
          ].questionGroups.filter((x: QuestionGroup) => {
            return x.group !== action.payload.formGroup.group;
          })
        }
      };
    }
    default:
      break;
  }
  return state;
}

export const getForms = (state: State) => state.forms;
export const getForm = (state: State, id: string) => state.forms[id];
export const getFormQuestions = (state: State, id: string) =>
  state.forms[id] ? state.forms[id].questions : [];

function hasFormId(id: string, state: State) {
  return !!state.forms[id];
}
function hasForm(form: Form, state: State): boolean {
  return hasFormId(form.id, state);
}
