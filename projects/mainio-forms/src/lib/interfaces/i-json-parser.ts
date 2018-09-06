import { QuestionBase } from "../models/question-base";

export abstract class IJSonParser {
  abstract stringifyQuestion(question: QuestionBase<any>): string;
  abstract parseQuestion(json: string): QuestionBase<any> | QuestionBase<any>[];
}
