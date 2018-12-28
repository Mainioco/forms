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

import { MapperExampleService } from "./services/mapper-example.service";
import { DisplayValidatorExampleService } from "./services/display-validator-example.service";
import { IndexComponent } from "./index/index.component";
import {
  documentationRoutes,
  DocumentationModule
} from "./documentation/documentation.module";
import { MarkdownModule } from "ngx-markdown";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faArchway,
  faBezierCurve
} from "@fortawesome/free-solid-svg-icons";
import { faAngular } from "@fortawesome/free-brands-svg-icons";
import { FeatureComponent } from "./components/feature/feature.component";

@NgModule({
  declarations: [AppComponent, IndexComponent, FeatureComponent],
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
    MarkdownModule.forRoot(),
    MatButtonModule,
    FontAwesomeModule,
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
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faAngular);
    library.add(faBezierCurve);
    library.add(faArchway);
  }
}
