import {
  MainioLifecycleActionTypes,
  LifecycleActions
} from "../actions/form-lifecycle-actions";
import { QuestionBase } from "../../models/question-base";
import { Form } from "../../models/form";
import { FormGroup } from "@angular/forms";
import { QuestionGroup } from "../../models/question-group";
import { LifecycleState, mainioFormsInitialState } from "../states/forms-state";

export function formActionsReducer(
  state = mainioFormsInitialState,
  action: LifecycleActions
): LifecycleState {
  switch (action.type) {
    case MainioLifecycleActionTypes.ValueChanges: {
      if (!hasFormId(action.payload.formId, state)) {
        break;
      }
      let g: QuestionGroup;

      if (action.payload.groupId) {
        g = {
          ...state.forms[action.payload.formId].questionGroups[
            action.payload.groupId
          ]
        };
        g.isValid = action.payload.groupIsValid;
      }
      let x: Form = {
        ...state.forms[action.payload.formId],
        values: {
          ...state.forms[action.payload.formId].values,
          ...action.payload.newValues
        },
        questions: state.forms[action.payload.formId].questions.map(
          (x: QuestionBase<any>) => {
            let t = {
              ...x
            };
            if (action.payload.newValues[x.key]) {
              t.value = action.payload.newValues[x.key];
            }
            return t;
          }
        ),
        questionGroups: {
          ...state.forms[action.payload.formId].questionGroups
        }
      };
      if (action.payload.groupId) {
        x.questionGroups[action.payload.groupId] = g;
      }
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.formId]: x
        }
      };
    }

    case MainioLifecycleActionTypes.LoadedValues:
      if (!hasFormId(action.payload.form.id, state)) {
        break;
      }
      let x: Form = {
        ...state.forms[action.payload.form.id],
        values: {
          ...state.forms[action.payload.form.id].values,
          ...action.payload.values
        }
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.form.id]: {
            ...x,
            values: {
              ...action.payload.values
            }
          }
        }
      };
    case MainioLifecycleActionTypes.ValueReset:
      if (!hasFormId(action.payload.form.id, state)) {
        break;
      }
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.form.id]: {
            ...state.forms[action.payload.form.id],
            values: {
              ...state.forms[action.payload.form.id].values,
              ...state.forms[action.payload.form.id].savedValues
            }
          }
        }
      };
    case MainioLifecycleActionTypes.SaveValues:
      if (!hasFormId(action.payload.id, state)) {
        break;
      }
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: {
            ...state.forms[action.payload.id],
            savedValues: {
              ...state.forms[action.payload.id].values
            }
          }
        }
      };
    case MainioLifecycleActionTypes.ClearValues:
      if (!hasFormId(action.payload.id, state)) {
        break;
      }
      let newValues = {};
      Object.keys({ ...state.forms[action.payload.id].values }).forEach(x => {
        newValues[x] = "";
      });
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.id]: {
            ...state.forms[action.payload.id],
            values: {
              ...newValues
            },
            savedValues: undefined
          }
        }
      };
    default:
      break;
  }
  if (!state.forms) {
    let x: any = {};
    return {
      ...state,
      forms: x
    };
  }
  return state;
}

function hasFormId(id: string, state: LifecycleState) {
  return state.forms ? !!state.forms[id] : false;
}
function hasForm(form: Form, state: LifecycleState): boolean {
  return hasFormId(form.id, state);
}
