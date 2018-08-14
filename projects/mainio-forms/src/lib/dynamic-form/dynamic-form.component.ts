import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../models/question-base";
import { QuestionControlService } from "../services/question-control.service";

@Component({
  selector: "mainio-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  useOneRowLayout: boolean;
  @Input()
  questions: QuestionBase<any>[] = [];
  @Input()
  submitButtonTitle: string;
  @Input()
  dontShowDefaultActions: boolean = false;
  @Output()
  onStatusChage: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  payLoad = "";

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.qcs.toFormGroup(this.questions);
    console.log("Form is", this.form, this.questions);
    if (!this.form) {
      return;
    }
    this.form.valueChanges.subscribe(x => {
      this.onStatusChage.emit(this.form);
      for (let q of this.questions) {
        q.value = this.form.controls[q.key].value;
      }
    });
  }
  onSubmitActions() {
    if (!this.onSubmit) {
      return;
    }
    this.onSubmit.emit(this.form);
  }
}
