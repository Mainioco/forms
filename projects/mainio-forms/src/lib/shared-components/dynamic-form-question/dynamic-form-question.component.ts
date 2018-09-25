import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

import { QuestionBase } from "../../models/question-base";
import { DropdownSearchQuestion } from "../../models/drop-down-search";
import { Observable, Subject } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { DropdownQuestion } from "../../models/dropdown-question";
import { ControlType } from "../../models/control-type.enum";
import { RepeatInput } from "../../models/repeat-input";
import { ILoadedValues } from "../../interfaces";
import { QuestionCreatorService } from "../../services";

@Component({
  selector: "mainio-form-question",
  styleUrls: ["./dynamic-form-question.component.css"],
  templateUrl: "./dynamic-form-question.component.html"
})
export class DynamicFormQuestionComponent implements OnChanges {
  @Input()
  compactStyle: boolean;
  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;
  @Input()
  values: ILoadedValues;

  controller: AbstractControl;
  public shallowQuestion: QuestionBase<any>;

  constructor(private _creator: QuestionCreatorService) {}

  get controlTypeString() {
    switch (this.question.controlType.toString()) {
      case ControlType.Dropdown:
        return "dropdown";
      case ControlType.DropdownSearch:
        return "dropdown-search";
      case ControlType.NumberInput:
        return "input-number";
      case ControlType.CheckBox:
        return "checkbox";
      case ControlType.RepeatInput:
        return "repeat-input";
      case ControlType.Slider:
        return "slider";
      case ControlType.Date:
        return "date";
      default:
        return "input";
    }
  }

  onDateChanged(event: Date) {
    this.form.controls[this.question.key].setValue(event, {
      onlySelf: false,
      emitEvent: true
    });
  }
  onRepeatValuesChanged(event: FormGroup) {
    let stringArr = [];
    for (let control of Object.keys(event.controls)) {
      stringArr.push(event.controls[control].value);
    }
    let obs = {};
    obs = JSON.stringify(stringArr);
    this.form.controls[this.question.key].setValue(obs, {
      onlySelf: false,
      emitEvent: true
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shallowQuestion = this._creator.createQuestionFromControlType(
      this.question.controlType,
      this.question
    );
    if (this.values) {
      this.shallowQuestion.setValue(
        this.values.values[this.question.key]
          ? this.values.values[this.question.key]
          : this.question.value
      );
    }
    this.controller = this.form.controls[this.question.key];
    this.controller.setValue(this.shallowQuestion.value, {
      emitEvent: false,
      onlySelf: true
    });
  }
}
