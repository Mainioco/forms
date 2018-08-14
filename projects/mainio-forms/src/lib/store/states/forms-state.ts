import { Form } from "../../models/form";

export interface LifecycleState {
  debugMode: boolean;
  forms?: { id: string; form: Form };
}

export const mainioFormsInitialState: LifecycleState = {
  debugMode: false,
  forms: undefined
};
