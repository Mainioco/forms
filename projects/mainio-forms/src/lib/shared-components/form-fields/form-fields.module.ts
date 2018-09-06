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
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { NumberInputComponent } from "./number-input/number-input.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { RepeatInputComponent } from "./repeat-input/repeat-input.component";
import { DateInputComponent } from "./date-input/date-input.component";
import { SliderInputComponent } from "./slider-input/slider-input.component";
import { SliderModule } from "primeng/slider";
const COMPONENTS = [
  SingleLineInputComponent,
  DropdownInputComponent,
  DropdownInputSearchComponent,
  NumberInputComponent,
  CheckboxComponent,
  RepeatInputComponent,
  SliderInputComponent,
  DateInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    SliderModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class FormFieldsModule {}
