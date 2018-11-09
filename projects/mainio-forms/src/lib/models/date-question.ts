import { QuestionBase } from "./question-base";
import { IDateQuestionOptions } from "../interfaces/i-date-question-options";
import { ControlType } from "./control-type.enum";

export class DateQuestion extends QuestionBase<Date> {
  controlType = ControlType.Date;

  constructor(options: IDateQuestionOptions = {}) {
    super(options);
    this.date = options.date;
  }

  set date(value: Date) {
    this.value = this.getSetValues(value);
  }

  get date(): Date {
    return this.value;
  }

  setValue(value: any) {
    this.value = this.getSetValues(value);
  }

  getSetValues(value: any) {
    let x = value ? value : this.value;
    return typeof x == "string" ? new Date(x) : x;
  }
}
