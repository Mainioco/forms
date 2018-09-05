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
import { QuestionControlService } from "../../../services";
import { FormGroup } from "@angular/forms";
import { IInputQuestionOptions, ILoadedValues } from "../../../interfaces";
import { Subscription, Observable } from "rxjs";
import { IRepeatInputOptions } from "../../../interfaces/i-repeat-input-options";

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
  values: Observable<ILoadedValues> | ILoadedValues;
  nestedForm: FormGroup;
  minLength: number = 0;
  maxLength: number = 0;
  inputHint: string = "";

  repeatFields: InputQuestion[];

  private parentSubscription: Subscription;
  private nestedFormSubscription: Subscription;
  private ownStatusChange: Subscription;
  constructor(private _formGroupService: QuestionControlService) {
    super();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    this.unsubscribe();
    this.updateRepeatFields(
      changes.question ? changes.question.currentValue.value : changes.values,
      changes.question
    );
    let res = this._formGroupService.createFormGroupFromQuestions(
      this.repeatFields
    );
    this.nestedForm = res.formGroup;
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
    this.repeatFields = [];
    let options: InputQuestion = new InputQuestion(this.question);
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
