import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionControlService } from "./question-control.service";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormFieldsModule } from "./form-fields/form-fields.module";
import { DynamicStoreFormComponent } from './dynamic-store-form/dynamic-store-form.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormFieldsModule
  ],
  declarations: [DynamicFormComponent, DynamicFormQuestionComponent, DynamicStoreFormComponent],
  providers: [QuestionControlService],
  exports: [DynamicFormComponent, DynamicFormQuestionComponent]
})
export class MainioFormsModule {}
