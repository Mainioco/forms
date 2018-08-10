import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import {
  MainioFormsModule,
  DropdownQuestion,
  InputQuestion
} from "mainio-forms";
import { RouterModule } from "@angular/router";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatOptionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule
} from "@angular/material";
import { BasicFormComponent } from "./examples/basic-form/basic-form.component";
import { StoreFormComponent } from "./examples/store-form/store-form.component";
import { ExamplesModule } from "./examples/examples.module";
import { SplitStoreFormComponent } from "./examples/split-store-form/split-store-form.component";

@NgModule({
  declarations: [AppComponent],
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
    ExamplesModule,
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
        path: "**",
        redirectTo: "basic",
        pathMatch: "full"
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
