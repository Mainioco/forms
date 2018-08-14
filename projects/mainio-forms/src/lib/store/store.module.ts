import { NgModule, InjectionToken, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicStoreFormComponent } from "./components/dynamic-store-form/dynamic-store-form.component";
import { SharedComponentsModule } from "../shared-components/shared-components.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule
} from "@angular/material";
import { MainioFormsStoreConfig } from "./interfaces/store-config";
import { MainioFormStoreServiceConfig } from "./tokens/service-config";

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    SharedComponentsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DynamicStoreFormComponent],
  providers: [],
  exports: [DynamicStoreFormComponent]
})
export class StoreModule {
  static provideStoreInformation(
    config: MainioFormsStoreConfig
  ): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
        {
          provide: MainioFormStoreServiceConfig,
          useValue: config
        }
      ]
    };
  }
}
