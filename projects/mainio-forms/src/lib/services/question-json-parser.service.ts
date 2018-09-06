import { Injectable } from "@angular/core";
import { QuestionBase } from "../models/question-base";
import { IJSonParser } from "../interfaces/i-json-parser";

@Injectable({
  providedIn: "root"
})
export class QuestionJsonParserService extends IJSonParser {
  parseQuestion(json: string): QuestionBase<any> | QuestionBase<any>[] {
    let c = JSON.parse(json, replacer);
    return c;
  }
  stringifyQuestion(question: QuestionBase<any>): string {
    let json = JSON.stringify(question, replacer);
    return json;
  }
}

export function replacer(key: string, value: any): any {
  let replacedKey = key.startsWith("_")
    ? key.replace(key, key.substring(1))
    : key;

  if (!this[replacedKey]) {
    return value;
  }

  if (value.constructor === Boolean) {
    return value === "true" ? true : value === "false" ? false : value;
  }
  if (value.constructor === Number) {
    return +value;
  }

  if (value.constructor === String) {
    try {
      let con = JSON.parse(value, replacer);
      return con;
    } catch (ex) {}
  }
  return value;
}
