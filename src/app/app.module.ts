import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MainioFormsModule } from "mainio-forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainioFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
