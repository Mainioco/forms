import { IValidationMessage } from "./i-validation-message";

export interface IFormSpecificValidationMessage {
  formId: string;
  questionSpecificMessages?: IQuestionSpecificValidationMessage[];
  messages: IValidationMessage[];
}

export interface IQuestionSpecificValidationMessage {
  questionKey: string;
  messages: IValidationMessage[];
}

export interface IValidationMessages {
  formSpecific?: IFormSpecificValidationMessage[];
  questionSpecificMessages?: IQuestionSpecificValidationMessage[];
  defaultMessages: IValidationMessage[];
}
