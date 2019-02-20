import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MatSidenavModule, MatButtonModule } from "@angular/material";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { IntroComponent } from "./getting-started/intro/intro.component";
import { MarkdownModule } from "ngx-markdown";
import { ItemComponent } from "./navigation/components/item/item.component";

export const documentationRoutes = [
  {
    path: "documentation",
    component: WelcomeComponent
  },
  {
    path: "documentation/getting-started",
    component: IntroComponent,
    pathMatch: "prefix"
  },
  {
    path: "documentation/api/form-fields",
    component: IntroComponent,
    pathMatch: "prefix"
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    WelcomeComponent,
    NavigationComponent,
    IntroComponent,
    ItemComponent
  ],
  exports: [WelcomeComponent]
})
export class DocumentationModule {}
