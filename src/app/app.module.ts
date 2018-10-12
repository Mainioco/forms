import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import {
  MainioFormsModule,
  DropdownQuestion,
  InputQuestion,
  IMapConfigurationToken,
  IDisplayValidatorToken
} from "mainio-forms";
import { RouterModule } from "@angular/router";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatCardModule,
  MatButtonModule
} from "@angular/material";
import { BasicFormComponent } from "./examples/basic-form/basic-form.component";
import { StoreFormComponent } from "./examples/store-form/store-form.component";
import { ExamplesModule, examplesRoutes } from "./examples/examples.module";
import { SplitStoreFormComponent } from "./examples/split-store-form/split-store-form.component";
import { ChatSendComponent } from "./examples/chat-send/chat-send.component";
import { JsonCreatorComponent } from "./examples/json-creator/json-creator.component";
import { BasicComponent } from "./infos/basic/basic.component";
import { StoreComponent } from "./infos/store/store.component";
import { SplitStoreComponent } from "./infos/split-store/split-store.component";
import { ChatComponent } from "./infos/chat/chat.component";
import { JsonComponent } from "./infos/json/json.component";
import { FormSettingChangerComponent } from "./form-setting-changer/form-setting-changer.component";
import { MapperExampleService } from "./services/mapper-example.service";
import { DisplayValidatorExampleService } from "./services/display-validator-example.service";
import { IndexComponent } from "./index/index.component";
import {
  documentationRoutes,
  DocumentationModule
} from "./documentation/documentation.module";

@NgModule({
  declarations: [AppComponent, FormSettingChangerComponent, IndexComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainioFormsModule,
    DocumentationModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTabsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    ExamplesModule,
    MatButtonModule,
    RouterModule.forRoot([
      ...documentationRoutes,
      ...examplesRoutes,
      {
        path: "index",
        component: IndexComponent
      },
      {
        path: "**",
        redirectTo: "index",
        pathMatch: "full"
      }
    ])
  ],
  providers: [
    {
      provide: IMapConfigurationToken,
      useClass: MapperExampleService,
      multi: true
    },
    {
      provide: IDisplayValidatorToken,
      useClass: DisplayValidatorExampleService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
