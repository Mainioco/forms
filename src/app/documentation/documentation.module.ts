import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WelcomeComponent } from "./welcome/welcome.component";

export const documentationRoutes = [
  {
    path: "documentation",
    children: [
      {
        path: "getting-started",
        component: WelcomeComponent
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class DocumentationModule {}
