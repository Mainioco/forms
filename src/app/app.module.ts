import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import {
  MainioFormsModule,
  DropdownQuestion,
  InputQuestion,
  IMapConfigurationToken
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
import { ExamplesModule } from "./examples/examples.module";
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

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    StoreComponent,
    SplitStoreComponent,
    ChatComponent,
    JsonComponent,
    FormSettingChangerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainioFormsModule,
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
      {
        path: "basic",
        component: BasicFormComponent,
        children: []
      },
      {
        path: "store",
        component: StoreFormComponent
      },
      {
        path: "store-split",
        component: SplitStoreFormComponent
      },
      {
        path: "chat-send",
        component: ChatSendComponent
      },
      {
        path: "json",
        component: JsonCreatorComponent
      },
      {
        path: "**",
        redirectTo: "basic",
        pathMatch: "full"
      }
    ])
  ],
  providers: [
    {
      provide: IMapConfigurationToken,
      useClass: MapperExampleService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
