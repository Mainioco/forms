import { Injectable } from "@angular/core";
import { ControlType } from "../models/control-type.enum";
import { IQuestionBaseOptions } from "../interfaces/i-question-base-options";
import { DropdownSearchQuestion } from "../models/drop-down-search";
import { QuestionBase } from "../models/question-base";
import { InputQuestion } from "../models/input-question";
import { DropdownQuestion } from "../models/dropdown-question";
import { CheckboxQuestion, NumberInputQuestion } from "../models";
import { RepeatInput } from "../models/repeat-input";
import { DateQuestion } from "../models/date-question";
import { SliderQuestion } from "../models/slider-question";
@Injectable({
  providedIn: "root"
})
export class QuestionCreatorService {
  constructor() {}

  createQuestionFromControlType(
    controlType: ControlType,
    data?: QuestionBase<any> | IQuestionBaseOptions
  ): QuestionBase<any> {
    switch (controlType) {
      case ControlType.Dropdown:
        return new DropdownQuestion(data);
      case ControlType.DropdownSearch:
        return new DropdownSearchQuestion(data);
      case ControlType.Input:
        return new InputQuestion(data);
      case ControlType.CheckBox:
        return new CheckboxQuestion(data);
      case ControlType.NumberInput:
        return new NumberInputQuestion(data);
      case ControlType.RepeatInput:
        return new RepeatInput(data);
      case ControlType.Date:
        return new DateQuestion(data);
      case ControlType.Slider:
        return new SliderQuestion(data);
    }
    return new InputQuestion(data);
  }

  createInputQuestionsFromObject(o: Object): InputQuestion[] {
    let vals = Object.keys(o);
    let toReturn = [];
    for (let val of vals) {
      let s = val.startsWith("_") ? val.substring(1) : val;
      let x = o[val];

      toReturn.push(
        new InputQuestion({
          key: s,
          label: s,
          value: this.convertParameterToInputFormt(x)
        })
      );
    }
    return toReturn;
  }

  convertParameterToInputFormt(x: any) {
    if (!x) {
      return undefined;
    }
    if (x.constructor === Array) {
      return JSON.stringify(x);
    }
    return x;
  }
}
