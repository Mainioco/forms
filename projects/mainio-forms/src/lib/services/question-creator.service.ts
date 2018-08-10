import { Injectable } from "@angular/core";
import { ControlType } from "../models/control-type.enum";
import { IQuestionBaseOptions } from "../interfaces/i-question-base-options";
import { DropdownSearchQuestion } from "../models/drop-down-search";
import { QuestionBase } from "../models/question-base";
import { InputQuestion } from "../models/input-question";
import { DropdownQuestion } from "../models/dropdown-question";
@Injectable({
  providedIn: "root"
})
export class QuestionCreatorService {
  constructor() {}

  createQuestionFromControlType(
    controlType: ControlType,
    data?: QuestionBase<any>
  ): QuestionBase<any> {
    switch (controlType) {
      case ControlType.Dropdown:
        return new DropdownQuestion(data);
      case ControlType.DropdownSearch:
        return new DropdownSearchQuestion(data);
      case ControlType.Input:
        return new InputQuestion(data);
    }
    return new InputQuestion(data);
  }
}
