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
  MatSelectModule,
  MatButtonModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormDataMapperService } from "./services/form-data-mapper.service";
import { FormGroupService } from "./services/form-group.service";
import { QuestionComponentFactoryService } from "./services/question-component-factory.service";
import { QuestionCreatorService } from "./services/question-creator.service";
import { QuestionDisplayValidatorService } from "./services/question-display-validator.service";
import { QuestionGroupService } from "./services/question-group.service";
import { LibraryLoggerService } from "./services/library-logger.service";
import { QuestionJsonParserService } from "./services/question-json-parser.service";
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    SharedComponentsModule,
    MatSelectModule,
    HttpClientModule
  ],
  declarations: [DynamicFormComponent],
  providers: [
    QuestionControlService,
    FormDataMapperService,
    FormGroupService,
    LibraryLoggerService,
    QuestionComponentFactoryService,
    QuestionCreatorService,
    QuestionDisplayValidatorService,
    QuestionGroupService,
    QuestionJsonParserService
  ],
  exports: [DynamicFormComponent]
})
export class MainioFormsModule {}
