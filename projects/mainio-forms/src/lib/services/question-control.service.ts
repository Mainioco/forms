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
import { Observable, of } from "rxjs";
import { Form } from "../models";

@Injectable()
export class QuestionControlService implements IFormGroupCreator {
  constructor(
    private _formGroupService: FormGroupService,
    private _http: HttpClient,
    private _creator: QuestionCreatorService
  ) {}

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
    data: IFormCreationOptions = undefined,
    isNew: boolean
  ): Promise<IFormGroupCreatedResult> {
    let promise = new Promise<IFormGroupCreatedResult>(resolve => {
      if (!data) {
        resolve({
          questionsUsed: questions,
          formGroup: this._formGroupService.InitializeGroup(
            questions,
            undefined
          )
        });
        return;
      }
      let res = data.limitToGroup
        ? questions.filter(x => x.group !== data.limitToGroup)
        : questions;
      resolve({
        questionsUsed: res,
        formGroup: this._formGroupService.InitializeGroup(
          res,
          data ? data.values : undefined
        )
      });
    });
    return promise;
  }

  private async loadJsonFromUrl(url: string): Promise<QuestionBase<any>[]> {
    return new Promise<QuestionBase<any>[]>(resolve => {
      this._http.get(url).subscribe((x: QuestionBase<any>[]) => {
        resolve(x);
      });
    });
  }
}
