import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { FormFieldsModule } from "./form-fields/form-fields.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
@NgModule({
  imports: [CommonModule, FormFieldsModule, ReactiveFormsModule, FormsModule],
  declarations: [DynamicFormQuestionComponent],
  exports: [DynamicFormQuestionComponent]
})
export class SharedComponentsModule {}
