import { ILoadedValues } from "./i-loaded-values";
import { InjectionToken, Inject } from "@angular/core";

export abstract class IMapConfiguration {
  abstract type: string;
  abstract mapToModelIdentifier: string;
  abstract limitToForms: string[];
  abstract defaultModel: any;
  abstract map(loadedValues: ILoadedValues, formId: string, currentValue: any);
}

export interface IMapConfigurationStore {
  getFromFormsStore(formId: string): Promise<any>;
}
