import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
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
import { Observable } from "rxjs";
import { ILoadedValues } from "../../interfaces";

export abstract class MainioFormComponentBaseComponent {
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
  values: Observable<ILoadedValues> | ILoadedValues;
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onValueChanges: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output()
  onStatusChanges: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  formValueChanges$: Observable<FormGroup>;
  displayQuestions: QuestionBase<any>[] = [];
  displayGroups: IDisplayGroup[] = [];
  form: FormGroup;
  protected initalized: boolean = false;

  constructor(protected _creator: IFormGroupCreator) {}

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

  setValuesFromKeys(values: { [key: string]: any }) {
    for (let x of Object.keys(values)) {
      let q = this.questions.find(y => y.key == x);
      if (!q) {
        continue;
      }
      if (!this.form.controls[x]) {
        continue;
      }
      // q.setValue(values[x]);
      this.form.controls[x].setValue(values[x]);
    }
  }
  protected initialize(data: IFormCreationOptions = undefined) {
    if (!this.questions) return;
    if (!this.questionsUrl) {
      let result: IFormGroupCreatedResult = this._creator.createFormGroupFromQuestions(
        this.questions,
        data
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
        this.formValueChanges$ = this.form.valueChanges;
        this.formValueChanges$.subscribe(x => {
          this.onValueChanges.emit(this.form);
        });
        this.form.statusChanges.subscribe(x => {
          this.onStatusChanges.emit(this.form);
        });
      }
    }
    this.initalized = !!this.form;
  }
}
