import { QuestionBase } from "../models";
import { FormGroup } from "@angular/forms";

export interface IFormCreationOptions {
  id: string;
  limitToGroup: string;
  values?: { [key: string]: any };
}

export interface IFormGroupCreatedResult {
  formGroup: FormGroup;
  questionsUsed: QuestionBase<any>[];
}

export abstract class IFormGroupCreator {
  abstract createFormGroupFromQuestions(
    questions: QuestionBase<any>[],
    data: IFormCreationOptions
  ): IFormGroupCreatedResult;
}
