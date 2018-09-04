import {
  MainioLifecycleActionTypes,
  LifecycleActions
} from "../actions/form-lifecycle-actions";
import { QuestionBase } from "../../models/question-base";
import { Form } from "../../models/form";
import { FormGroup } from "@angular/forms";
import { QuestionGroup } from "../../models/question-group";
import { formActionsReducer } from "./form-actions-reducers";
import { LifecycleState, mainioFormsInitialState } from "../states/forms-state";

export function lifecycleReducer(
  state = mainioFormsInitialState,
  action: LifecycleActions
): LifecycleState {
  switch (action.type) {
    case MainioLifecycleActionTypes.Created: {
      let x = action.payload;
      if (state.forms) {
        if (state.forms[action.payload.id]) {
          x = {
            ...state.forms[action.payload.id]
          };
          if (action.payload.questionGroups) {
            if (state.forms[action.payload.id].questionGroups) {
              x.questionGroups = {
                ...state.forms[action.payload.id].questionGroups,
                ...action.payload.questionGroups
              };
            } else {
              x.questionGroups = {
                ...action.payload.questionGroups
              };
            }
          }
          if (state.forms[action.payload.id].questions) {
            x.questions = [
              ...state.forms[action.payload.id].questions,
              ...action.payload.questions
            ];
          } else {
            x.questions = [...action.payload.questions];
          }
        }
      }
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: {
            ...x
          }
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
          ...state[action.payload.form.id],
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
          ...state[action.payload.form.id],
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
  return formActionsReducer(state, action);
}

export const getForms = (state: LifecycleState) => state.forms;
export const getForm = (state: LifecycleState, id: string) => state.forms[id];
export const getFormQuestions = (state: LifecycleState, id: string) =>
  state.forms ? (state.forms[id] ? state.forms[id].questions : []) : [];

function hasFormId(id: string, state: LifecycleState) {
  return state.forms ? !!state.forms[id] : false;
}
function hasForm(form: Form, state: LifecycleState): boolean {
  return hasFormId(form.id, state);
}
