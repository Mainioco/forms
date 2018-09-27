import { Injectable } from "@angular/core";
import { IQuestionDisplayValidator } from "mainio-forms";
import { QuestionBase, CheckboxQuestion } from "mainio-forms";

@Injectable({
  providedIn: "root"
})
export class DisplayValidatorExampleService extends IQuestionDisplayValidator {
  forForm: string = "store-form";

  validate(
    formId: string,
    validatingQuestion: QuestionBase<any>,
    currentValue: boolean,
    questions: QuestionBase<any>[]
  ) {
    if (validatingQuestion.key != "x1" && validatingQuestion.key != "x2")
      return;

    let check = questions.find(x => x.key == "hide_x1_x2") as CheckboxQuestion;
    return check ? !check.enabled : currentValue;
  }

  constructor() {
    super();
  }
}
