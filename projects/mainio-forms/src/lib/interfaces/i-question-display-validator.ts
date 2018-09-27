import { QuestionBase } from "../models/question-base";

export abstract class IQuestionDisplayValidator {
  abstract forForm: string;

  abstract validate(
    formId: string,
    validatingQuestion: QuestionBase<any>,
    currentValue: boolean,
    questions: QuestionBase<any>[]
  );
}
