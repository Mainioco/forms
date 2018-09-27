import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { FormLayout } from "../../models";
import { IDisplayGroup } from "../../interfaces/i-display-group";
import { QuestionBase } from "../../models/question-base";
import { FormGroup, FormControl } from "@angular/forms";
import { QuestionGroupService } from "../../services/question-group.service";
import {
  IFormGroupCreator,
  IFormCreationOptions,
  IFormGroupCreatedResult
} from "../../interfaces/i-form-group-creator";
import { Observable, Subscription } from "rxjs";
import { ILoadedValues, IFormValuesInput } from "../../interfaces";
import { FormDataMapperService } from "../../services";

export abstract class MainioFormComponentBaseComponent implements OnDestroy {
  @Input()
  questions: QuestionBase<any>[] = [];
  @Input()
  formLayout: FormLayout;
  @Input()
  questionsUrl: string;
  @Input()
  formId: string;
  @Input()
  limitToGroup: string;
  @Input()
  values: ILoadedValues;
  @Input()
  mapValuesTo: string;
  @Input()
  emitMappedValuesOnChanges: boolean;
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onValueChanges: EventEmitter<FormGroup | any> = new EventEmitter<
    FormGroup | any
  >();
  @Output()
  onStatusChanges: EventEmitter<FormGroup | any> = new EventEmitter<
    FormGroup | any
  >();
  formValueChanges$: Observable<FormGroup>;
  displayQuestions: QuestionBase<any>[] = [];
  displayGroups: IDisplayGroup[] = [];
  form: FormGroup;

  protected initalized: boolean = false;
  protected _ownQuestions: QuestionBase<any>;
  protected _formValueChanged: Subscription;
  protected _formStatusChanged: Subscription;

  constructor(
    protected _creator: IFormGroupCreator,
    protected _mapper: FormDataMapperService
  ) {}

  onSubmitActions() {
    if (!this.onSubmit) {
      return;
    }
    this.onSubmit.emit(this.form);
  }

  get formClass(): string {
    switch (this.formLayout) {
      case FormLayout.Col_2:
        return "row-form column-2";
      case FormLayout.OneRow:
        return "row-form";
      default:
        return "column-form column-1";
    }
  }

  setValuesFromKeys(values: IFormValuesInput, emitEvent: boolean = true) {
    if (!this.form) return;
    for (let x of Object.keys(values)) {
      let q = this.questions.find(y => y.key == x);
      if (!q) {
        continue;
      }
      if (!this.form.controls[x]) {
        continue;
      }
      // q.setValue(values[x]);
      this.form.controls[x].setValue(values[x], { emitEvent: emitEvent });
    }
  }
  protected async initialize(data: IFormCreationOptions = undefined) {
    if (!this.questions || this.questions.length === 0) {
      return;
    }
    if (!this.questions) return;
    if (!this.questionsUrl) {
      let result = await this._creator.createFormGroupFromQuestions(
        this.questions,
        data,
        !this.initalized
      );
      this.form = result.formGroup;
      this.displayQuestions = result.questionsUsed;
      this.displayGroups = [];
      let max = 1;
      switch (this.formLayout) {
        case FormLayout.Col_2:
          max = 2;
          break;
        case FormLayout.OneRow:
          max = 0;
          break;
      }
      let curAmount = 0;
      let groups = 0;
      for (let q of this.displayQuestions) {
        if (curAmount === 0) {
          this.displayGroups.push({
            questions: []
          });
          groups++;
        }
        this.displayGroups[groups - 1].questions.push(q);
        curAmount++;
        if (curAmount >= max && max > 0) {
          curAmount = 0;
        }
      }
      if (this.form) {
        this.unsubscribe();
        this.formValueChanges$ = this.form.valueChanges;
        this._formValueChanged = this.formValueChanges$.subscribe(x => {
          this.onValueChanges.emit(this.getEmitValue());
        });
        this._formStatusChanged = this.form.statusChanges.subscribe(x => {
          this.onStatusChanges.emit(this.getEmitValue());
        });
      }
      this.initalized = !!this.form;
    }
  }

  unsubscribe() {
    if (this._formValueChanged) this._formValueChanged.unsubscribe();
    if (this._formStatusChanged) this._formStatusChanged.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  getEmitValue(): FormGroup | any {
    if (!this.emitMappedValuesOnChanges) {
      return this.form;
    }
    let val = this._mapper.map(
      this.mapValuesTo,
      this.formId,
      {
        values: this.form.value
      },
      undefined
    );
    if (val === false) {
      return this.form;
    }
    return val;
  }
}
