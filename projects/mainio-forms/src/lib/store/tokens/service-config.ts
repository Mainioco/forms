import { MainioFormsStoreConfig } from "../interfaces/store-config";
import { InjectionToken } from "@angular/core";

export const MainioFormStoreServiceConfig = new InjectionToken<
  MainioFormsStoreConfig
>("MainioFormsStoreConfig");
