import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

import { QuestionBase } from "../../models/question-base";
import { DropdownSearchQuestion } from "../../models/drop-down-search";
import { Observable, Subject, of, Subscription } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { DropdownQuestion } from "../../models/dropdown-question";
import { ControlType } from "../../models/control-type.enum";
import { RepeatInput } from "../../models/repeat-input";
import { ILoadedValues } from "../../interfaces";
import { QuestionCreatorService } from "../../services/question-creator.service";
import { ValidationMessagesService } from "../../services/validation-messages.service";
import { LibraryLoggerService } from "../../services/library-logger.service";

@Component({
  selector: "mainio-form-question",
  styleUrls: ["./dynamic-form-question.component.css"],
  templateUrl: "./dynamic-form-question.component.html"
})
export class DynamicFormQuestionComponent implements OnChanges, OnDestroy {
  @Input()
  formId: string;
  @Input()
  compactStyle: boolean;
  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;
  @Input()
  values: ILoadedValues;
  errors: string[];
  errorsSubscription: Subscription;
  controller: FormControl;
  public shallowQuestion: QuestionBase<any>;

  constructor(
    private _creator: QuestionCreatorService,
    private _validationMessage: ValidationMessagesService,
    private _logger: LibraryLoggerService
  ) {}

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

  ngOnDestroy() {
    if (this.errorsSubscription) this.errorsSubscription.unsubscribe();
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
    this.controller = this.form.controls[this.question.key] as FormControl;
    if (!this.controller) {
      this._logger.error(
        "Form control missing for question container. Tried to locate control from FormGroup with key " +
        !this.question
          ? "undefined question"
          : !this.question.key
            ? "undefined"
            : this.question.key
      );
      return;
    }
    this.errors = this._validationMessage.getValidationMessages(
      this.controller as FormControl,
      this.question.key,
      this.formId
    );
    this.errorsSubscription = this.controller.statusChanges.subscribe(x => {
      this.errors = this._validationMessage.getValidationMessages(
        this.controller as FormControl,
        this.question.key,
        this.formId
      );
    });

    this.controller.setValue(this.shallowQuestion.value, {
      emitEvent: false,
      onlySelf: true
    });
  }
}
