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
  MatSelectModule
} from "@angular/material";
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
    MatSelectModule
  ],
  declarations: [
    SingleLineInputComponent,
    DropdownInputComponent,
    DropdownInputSearchComponent
  ],
  exports: [
    SingleLineInputComponent,
    DropdownInputComponent,
    DropdownInputSearchComponent
  ]
})
export class FormFieldsModule {}
