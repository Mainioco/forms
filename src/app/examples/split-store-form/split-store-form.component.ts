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
  questionsToPass: QuestionBase<any>[] = [];
  idToPass: string;
  questionsToPass2: QuestionBase<any>[];
  idToPass2: string;
  results;
  constructor(
    private _http: HttpClient,
    private qcs: QuestionControlService,
    private _store: StoreService,
    private _creator: QuestionCreatorService
  ) {}
  async ngOnInit() {
    this.loadSubTemplates("background-questions");
    this.loadSubTemplates("main-questions");
  }

  loadSubTemplates(name: string) {
    this._http
      .get("/assets/examples/store-split/" + name + ".json")
      .subscribe((x: Form) => {
        this.idToPass = x.id;
        this.questionsToPass = [
          ...this.questionsToPass,
          ...x.questions.map(q => {
            return this._creator.createQuestionFromControlType(
              q.controlType,
              q
            );
          })
        ];
      });
  }

  loadExternalValues() {
    this._http.get("/assets/examples/store-split/values.json").subscribe(x => {
      this.results = x;
    });
  }
}
