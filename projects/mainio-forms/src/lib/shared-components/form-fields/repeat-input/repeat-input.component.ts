import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { RepeatInput } from "../../../models/repeat-input";
import { QuestionBase, InputQuestion } from "../../../models";
import { QuestionControlService } from "../../../services/question-control.service";
import { FormGroup } from "@angular/forms";
import { ILoadedValues } from "../../../interfaces/i-loaded-values";
import { Subscription, Observable } from "rxjs";
import { IRepeatInputOptions } from "../../../interfaces/i-repeat-input-options";
import { AbstractControl } from "@angular/forms";
import { FormGroupService } from "../../../services/form-group.service";

@Component({
  selector: "mainio-form-repeat-input",
  templateUrl: "./repeat-input.component.html",
  styleUrls: ["./repeat-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepeatInputComponent extends FormFieldBaseComponent
  implements OnDestroy {
  @Input()
  question: RepeatInput;
  @Output()
  onChanges: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input()
  values: ILoadedValues;
  @Input()
  controller: AbstractControl;
  nestedForm: FormGroup;
  minLength: number = 0;
  maxLength: number = 0;
  inputHint: string = "";

  repeatFields: InputQuestion[];

  private parentSubscription: Subscription;
  private nestedFormSubscription: Subscription;
  private ownStatusChange: Subscription;
  constructor(private _formGroupService: FormGroupService) {
    super();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
  async ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    let values = [];
    if (
      this.values &&
      this.values.values &&
      this.values.values[this.question.key]
    ) {
      try {
        if (this.values.values[this.question.key].constructor === String) {
          let s = this.values.values[this.question.key];
          values = JSON.parse(s);
        } else if (this.values.values[this.question.key] === Array) {
          values = this.values.values[this.question.key];
        }
      } catch (ex) {}
    }
    this.unsubscribe();
    this.updateRepeatFields(values, changes.question);
    this.nestedForm = this._formGroupService.InitializeGroup(
      this.repeatFields,
      undefined
    );
    this.setValues(values);
    this.nestedFormSubscription = this.nestedForm.valueChanges.subscribe(x => {
      this.onChanges.emit(this.nestedForm);
    });
    this.suffix = this.getSuffix(0);
    this.prefix = this.getPrefix(0);
  }

  getPrefix(index: number) {
    return this.question.prefix;
  }

  getSuffix(index: number) {
    return this.question.suffix;
  }

  getItemArray() {
    let toRet = [];
    for (let i = 0; i < this.question.repeatTimes; i++) {
      toRet.push({ index: i });
    }
    return toRet;
  }

  getLengthDisplayers(index: number) {
    this.minLength =
      this.getQuestion<RepeatInput>().minLength > 0
        ? this.getQuestion<RepeatInput>().minLength
        : -1;
    this.maxLength =
      this.getQuestion<RepeatInput>().maxLength >=
      this.getQuestion<RepeatInput>().minLength
        ? this.getQuestion<RepeatInput>().maxLength
        : this.getQuestion<RepeatInput>().minLength;
    if (this.maxLength <= 0) {
      this.maxLength = -1;
    }
    this.inputHint = "";
    this.inputHint +=
      this.minLength > 0 && this.maxLength > this.minLength ? "/" : "";
    this.inputHint +=
      this.maxLength && this.maxLength > this.minLength ? this.maxLength : "";
    return this.inputHint;
  }

  updateRepeatFields(vals: string[], questionsUpdated) {
    if (this.ownStatusChange) {
      this.ownStatusChange.unsubscribe();
    }
    this.ownStatusChange = this.formGroup.controls[
      this.question.key
    ].statusChanges.subscribe(x => {
      for (let i = 0; i < this.question.repeatTimes; i++) {
        let k = "repeat_input_" + i + "_for_" + this.question.key;
        this.nestedForm.controls[k].setErrors(
          this.formGroup.controls[this.question.key].errors
        );
        this.nestedForm.controls[k].markAsTouched();
      }
    });
    this.setValues(vals);
  }

  setValues(vals: string[]) {
    this.repeatFields = [];
    let options: InputQuestion = new InputQuestion(this.question);
    for (let i = 0; i < this.question.repeatTimes; i++) {
      options.value = vals && i < vals.length ? vals[i] : "";
      let q = new InputQuestion(options);
      q.key = "repeat_input_" + i + "_for_" + this.question.key;
      q.label = this.question.getPlaceholderByIndex(i);
      q.required = this.question.required;

      if (this.nestedForm) {
        let r = this.nestedForm.controls[q.key];
        if (r) {
          r.setValue(q.value);
        }
      }
      this.repeatFields.push(q);
    }
  }
  private unsubscribe() {
    if (this.parentSubscription) this.parentSubscription.unsubscribe();
    if (this.nestedFormSubscription) this.nestedFormSubscription.unsubscribe();
    if (this.ownStatusChange) this.ownStatusChange.unsubscribe();
  }
}
