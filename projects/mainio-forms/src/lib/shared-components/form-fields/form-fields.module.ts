import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SingleLineInputComponent } from "./single-line-input/single-line-input.component";
import { DropdownInputComponent } from "./dropdown-input/dropdown-input.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DropdownInputSearchComponent } from "./dropdown-input-search/dropdown-input-search.component";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule
} from "@angular/material";
import { NumberInputComponent } from "./number-input/number-input.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { FormFieldBaseComponent } from "./form-field-base/form-field-base.component";
const COMPONENTS = [
  SingleLineInputComponent,
  DropdownInputComponent,
  DropdownInputSearchComponent,
  NumberInputComponent,
  CheckboxComponent
];
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class FormFieldsModule {}
