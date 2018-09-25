import { QuestionBase, Form } from "../models";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

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
    data: IFormCreationOptions,
    isNew: boolean
  ): Promise<IFormGroupCreatedResult>;
}
