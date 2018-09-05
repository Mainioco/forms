import { Component, OnInit } from "@angular/core";
import {
  InputQuestion,
  DropdownQuestion,
  QuestionBase,
  ControlType,
  QuestionCreatorService,
  IQuestionBaseOptions
} from "mainio-forms";
import { FormGroup } from "@angular/forms";
import { QuestionJsonParserService } from "projects/mainio-forms/src/lib/services/question-json-parser.service";

interface IObject {
  key: string;
  label: string;
  type: string;
}

interface EditQuestion {
  key: string;
  type: string;
  questions: QuestionBase<any>[];
}

@Component({
  selector: "mainio-form-json-creator",
  templateUrl: "./json-creator.component.html",
  styleUrls: ["./json-creator.component.css"]
})
export class JsonCreatorComponent implements OnInit {
  d = new DropdownQuestion({
    key: "new_q_type",
    label: "Question type",
    options: []
  });
  t = new InputQuestion({
    key: "new_q_title",
    label: "New question title"
  });
  mode: number = 1;
  newQuestions: QuestionBase<any>[] = [];
  objects: IObject[] = [];
  editQuestions: EditQuestion[] = [];
  previewQuestions: QuestionBase<any>[] = [];
  previewJson: string;
  previewJsonObject;
  constructor(
    private _creator: QuestionCreatorService,
    private _json: QuestionJsonParserService
  ) {}

  ngOnInit() {
    this.d.options = [];
    Object.keys(ControlType).forEach(x =>
      this.d.options.push({
        key: "new_q_t_opt_" + x,
        value: x,
        label: x
      })
    );
    this.newQuestions = [this.t, this.d];
  }

  setObject(obj: Object, key: string, value: any) {
    try {
      obj[key] = JSON.parse(value);
    } catch (ex) {
      obj[key] = value;
    }
  }
  setMode(index: number) {
    this.previewQuestions = [];
    for (let x of this.editQuestions) {
      let object: IQuestionBaseOptions = {};
      x.questions.forEach(item => this.setObject(object, item.key, item.value));
      this.previewQuestions.push(
        this._creator.createQuestionFromControlType(ControlType[x.type], object)
      );
    }
    this.previewJson = "[";
    this.previewQuestions.forEach(
      (x: QuestionBase<any>, index: number) =>
        (this.previewJson += this._json.stringifyQuestion(x) + ",")
    );
    this.previewJson =
      this.previewJson.substring(0, this.previewJson.length - 1) + "]";
    this.previewJsonObject = this._json.parseQuestion(this.previewJson);
    this.mode = index;
  }

  onSubmit(event: FormGroup) {
    this.objects.push({
      key: this.t.value.toLowerCase().replace(" ", "_"),
      label: this.t.value,
      type: this.d.value
    });
    this.editQuestions = [];
    this.objects.forEach((element: IObject, index: number) => {
      let t: IQuestionBaseOptions = {
        key: this.objects[index].key,
        label: this.objects[index].label
      };
      let s = this._creator.createQuestionFromControlType(
        ControlType[this.objects[index].type],
        t
      );
      this.editQuestions.push({
        key: this.objects[index].key,
        type: element.type,
        questions: this._creator.createInputQuestionsFromObject(s)
      });
    });
  }
}
