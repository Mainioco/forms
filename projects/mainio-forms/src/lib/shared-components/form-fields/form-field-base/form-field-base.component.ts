import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { QuestionBase } from "../../../models";

export class FormFieldBaseComponent implements OnChanges {
  @Input()
  question: QuestionBase<any>;
  @Input()
  formGroup: FormGroup;
  @Input()
  errors: string[];
  @Output()
  onFieldChanged: EventEmitter<QuestionBase<any>> = new EventEmitter<
    QuestionBase<any>
  >();
  @Input()
  controller: AbstractControl;

  suffix: string = "";
  prefix: string = "";

  constructor() {}

  getQuestion<T extends QuestionBase<any>>(): T {
    return this.question as T;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onFieldChanged.emit(this.question);
  }
}
