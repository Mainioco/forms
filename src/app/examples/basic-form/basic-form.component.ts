import { Component, OnInit } from "@angular/core";
import { QuestionBase, InputQuestion } from "mainio-forms";
import { HttpClient } from "@angular/common/http";
import { QuestionControlService } from "mainio-forms";

@Component({
  selector: "mainio-form-basic-form",
  templateUrl: "./basic-form.component.html",
  styleUrls: ["./basic-form.component.css"]
})
export class BasicFormComponent implements OnInit {
  questions: QuestionBase<any>[] = [];
  payload: any;
  constructor(private _http: HttpClient, private qcs: QuestionControlService) {}

  async ngOnInit() {
    this.questions = await this.qcs.loadFromUrl(
      "/assets/examples/basic-form.json"
    );
  }

  updateJson(event) {
    this.payload = event;
  }
}
