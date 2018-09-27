import { Form } from "../../models/form";

export interface LifecycleState {
  debugMode: boolean;
  forms?: { id: string; form: Form };
  mappedModels?: { id: string; model: any };
}

export const mainioFormsInitialState: LifecycleState = {
  debugMode: false,
  forms: undefined,
  mappedModels: undefined
};
