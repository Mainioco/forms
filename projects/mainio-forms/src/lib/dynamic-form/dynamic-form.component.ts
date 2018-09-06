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
import { Observable, Subscription } from "rxjs";
import { MainioFormComponentBaseComponent } from "../shared-components/mainio-form-component-base/mainio-form-component-base.component";
import { ILoadedValues } from "../interfaces";
import { FormLayout } from "../models/form-layout.enum";

@Component({
  selector: "mainio-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  providers: [QuestionControlService]
})
export class DynamicFormComponent extends MainioFormComponentBaseComponent
  implements OnChanges {
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
  @Input()
  submitButtonTitle: string;

  form: FormGroup;
  payLoad = "";

  constructor(private qcs: QuestionControlService) {
    super(qcs);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize({ id: undefined, limitToGroup: this.limitToGroup });
    if (!this.form) {
      return;
    }
    this.formValueChanges$ = this.form.valueChanges;
    if (changes.values) {
      for (let x of Object.keys(changes.values)) {
        this.form.controls[x].setValue(changes.values[x]);
      }
    }
    this.formValueChanges$.subscribe(x => {
      this.onStatusChanges.emit(this.form);
      for (let q of this.questions) {
        q.value = this.form.controls[q.key].value;
      }
    });
  }
}
