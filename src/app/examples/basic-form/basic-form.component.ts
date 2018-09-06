import { Component, OnInit } from "@angular/core";
import { QuestionBase, InputQuestion, FormLayout } from "mainio-forms";
import { HttpClient } from "@angular/common/http";
import { QuestionControlService } from "mainio-forms";
import { FormLayoutService } from "../../services/form-layout.service";

@Component({
  selector: "mainio-form-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.css"]
})
export class BasicFormComponent implements OnInit {
  questions: QuestionBase<any>[] = [];
  payload: any;
  layout: FormLayout;
  constructor(
    private _http: HttpClient,
    private qcs: QuestionControlService,
    private _layout: FormLayoutService
  ) {}

  async ngOnInit() {
    this.questions = await this.qcs.loadFromUrl(
      "/assets/examples/basic-form.json"
    );
    this._layout.layout$.subscribe(x => {
      this.layout = x;
    });
  }

  updateJson(event) {
    this.payload = event;
  }
}
