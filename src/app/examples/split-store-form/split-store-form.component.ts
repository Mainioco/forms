import { Component, OnInit } from "@angular/core";
import { QuestionBase, QuestionCreatorService } from "mainio-forms";
import { Form, QuestionControlService, StoreService } from "mainio-forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "mainio-form-split-store-form",
  templateUrl: "./split-store-form.component.html",
  styleUrls: ["./split-store-form.component.css"]
})
export class SplitStoreFormComponent implements OnInit {
  questionsToPass: QuestionBase<any>[];
  idToPass: string;
  questionsToPass2: QuestionBase<any>[];
  idToPass2: string;
  constructor(
    private _http: HttpClient,
    private qcs: QuestionControlService,
    private _store: StoreService,
    private _creator: QuestionCreatorService
  ) {}
  async ngOnInit() {
    this._http
      .get("/assets/examples/store-form-split.json")
      .subscribe((x: Form) => {
        this.idToPass = x.id;
        this.questionsToPass = x.questions.map(q => {
          return this._creator.createQuestionFromControlType(q.controlType, q);
        });
      });
    this._http.get("/assets/examples/store-form.json").subscribe((x: Form) => {
      this.idToPass2 = x.id;
      this.questionsToPass2 = x.questions.map(q => {
        return this._creator.createQuestionFromControlType(q.controlType, q);
      });
    });
  }
}
