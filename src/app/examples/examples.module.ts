import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreFormComponent } from "./store-form/store-form.component";
import { BasicFormComponent } from "./basic-form/basic-form.component";
import {
  MainioFormsModule,
  DropdownQuestion,
  InputQuestion
} from "mainio-forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreModule as MainioStore } from "mainio-forms";
import { reducers, metaReducers } from "./store/reducers";
import { environment } from "../../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SplitStoreFormComponent } from "./split-store-form/split-store-form.component";
import { ChatSendComponent } from "./chat-send/chat-send.component";
import {
  MatInputModule,
  MatButtonModule
} from "../../../node_modules/@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MainioFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    MainioStore.provideStoreInformation({
      storeName: "mainioForms"
    })
  ],
  declarations: [
    StoreFormComponent,
    BasicFormComponent,
    SplitStoreFormComponent,
    ChatSendComponent
  ],
  exports: [BasicFormComponent, StoreFormComponent]
})
export class ExamplesModule {}
