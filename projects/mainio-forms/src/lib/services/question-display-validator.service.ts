import { Injectable, InjectionToken, Inject, Optional } from "@angular/core";
import { IQuestionDisplayValidator } from "../interfaces/i-question-display-validator";
import { LibraryLoggerService } from "./library-logger.service";
import { QuestionBase } from "../models";

export const IDisplayValidatorToken = new InjectionToken<
  IQuestionDisplayValidator
>("IQuestionDisplayValidator");

export interface IRegisteredQuestionValidator {
  formId: string;
  validator: IQuestionDisplayValidator;
}
@Injectable({
  providedIn: "root"
})
export class QuestionDisplayValidatorService {
  private _validators: IRegisteredQuestionValidator[] = [];

  constructor(
    private _log: LibraryLoggerService,
    @Optional()
    @Inject(IDisplayValidatorToken)
    private services: IQuestionDisplayValidator[]
  ) {
    if (this.services)
      this.services.forEach(s => this.addConfiguration(s.forForm, s));
  }

  validate(
    formId: string,
    validatingQuestion: QuestionBase<any>,
    questions: QuestionBase<any>[]
  ): boolean {
    let current = validatingQuestion.hidden || false;
    for (let v of this._validators.filter(x => x.formId == formId)) {
      let shouldChange = v.validator.validate(
        formId,
        validatingQuestion,
        current,
        questions
      );
      if (shouldChange) {
        return !current;
      }
    }
    return current;
  }

  addConfiguration(formId: string, service: IQuestionDisplayValidator) {
    this._validators.push({ formId: formId, validator: service });
  }
}
