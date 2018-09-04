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

@Component({
  selector: "mainio-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionControlService]
})
export class DynamicFormComponent extends MainioFormComponentBaseComponent
  implements OnChanges {
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
      this.onStatusChage.emit(this.form);
      for (let q of this.questions) {
        q.value = this.form.controls[q.key].value;
      }
    });
  }
}
