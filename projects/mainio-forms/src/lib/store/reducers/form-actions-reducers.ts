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
      let x = {
        ...state.forms[action.payload.formId],
        values: {
          ...action.payload.newValues
        }
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.formId]: x
        }
      };
    }

    default:
      break;
  }
  return state;
}

function hasFormId(id: string, state: LifecycleState) {
  return state.forms ? !!state.forms[id] : false;
}
function hasForm(form: Form, state: LifecycleState): boolean {
  return hasFormId(form.id, state);
}
