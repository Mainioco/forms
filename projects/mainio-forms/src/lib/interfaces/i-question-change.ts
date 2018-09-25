import { QuestionBase } from "../models";

export interface IQuestionsChange {
  currentValue: QuestionBase<any>[];
  previousValue: QuestionBase<any>[];
  firstChange: boolean;
}
