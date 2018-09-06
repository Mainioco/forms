import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { QuestionBase } from "../models/question-base";
import { FormGroupService } from "./form-group.service";
import { HttpClient } from "@angular/common/http";
import { QuestionCreatorService } from "./question-creator.service";
import {
  IFormGroupCreator,
  IFormCreationOptions,
  IFormGroupCreatedResult
} from "../interfaces";

@Injectable()
export class QuestionControlService extends IFormGroupCreator {
  constructor(
    private _formGroupService: FormGroupService,
    private _http: HttpClient,
    private _creator: QuestionCreatorService
  ) {
    super();
  }

  loadFromJson(question: QuestionBase<any>[]): QuestionBase<any>[] {
    let toReturn: QuestionBase<any>[] = [];
    for (let q of question) {
      let x = q.controlType;
      let a: QuestionBase<any> = this._creator.createQuestionFromControlType(
        x,
        q
      );
      toReturn.push(a);
    }
    return toReturn;
  }

  async loadFromUrl(url: string): Promise<QuestionBase<any>[]> {
    let result: QuestionBase<any>[] = await this.loadJsonFromUrl(url);
    return new Promise<QuestionBase<any>[]>(resolve => {
      let toReturn = this.loadFromJson(result);
      resolve(toReturn);
    });
  }

  public createFormGroupFromQuestions(
    questions: QuestionBase<any>[],
    data: IFormCreationOptions = undefined
  ): IFormGroupCreatedResult {
    if (!data) {
      return {
        questionsUsed: questions,
        formGroup: this._formGroupService.InitializeGroup(questions, undefined)
      };
    }
    let res = data.limitToGroup
      ? questions.filter(x => x.group === data.limitToGroup)
      : questions;
    return {
      questionsUsed: res,
      formGroup: this._formGroupService.InitializeGroup(
        res,
        data ? data.values : undefined
      )
    };
  }

  private async loadJsonFromUrl(url: string): Promise<QuestionBase<any>[]> {
    return new Promise<QuestionBase<any>[]>(resolve => {
      this._http.get(url).subscribe((x: QuestionBase<any>[]) => {
        resolve(x);
      });
    });
  }
}
