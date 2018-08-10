import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionControlService } from "./services/question-control.service";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedComponentsModule } from "./shared-components/shared-components.module";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    SharedComponentsModule,
    MatSelectModule,
    HttpClientModule
  ],
  declarations: [DynamicFormComponent],
  providers: [QuestionControlService],
  exports: [DynamicFormComponent]
})
export class MainioFormsModule {}
