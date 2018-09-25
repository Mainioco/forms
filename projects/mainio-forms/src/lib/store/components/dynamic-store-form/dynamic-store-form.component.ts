import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { QuestionBase } from "../../../models/question-base";
import { FormGroup } from "@angular/forms";
import { StoreService } from "../../services/store.service";
import { QuestionControlService } from "../../../services/question-control.service";
import { QuestionGroup } from "../../../models/question-group";
import { FormLayout } from "../../../models";
import { IDisplayGroup } from "../../../interfaces/i-display-group";
import { MainioFormComponentBaseComponent } from "../../../shared-components/mainio-form-component-base/mainio-form-component-base.component";
import { ILoadedValues } from "../../../interfaces/i-loaded-values";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "mainio-form-dynamic-store-form",
  templateUrl: "./dynamic-store-form.component.html",
  styleUrls: [
    "./dynamic-store-form.component.css",
    "../../../styles/form-shared-styles.css"
  ]
})
export class DynamicStoreFormComponent extends MainioFormComponentBaseComponent
  implements OnDestroy {
  @Input()
  dontShowDefaultActions: boolean = false;
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
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onValueChanges: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output()
  onStatusChanges: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input()
  submitButtonTitle: string;

  payLoad = "";

  constructor(private _storeService: StoreService) {
    super(_storeService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.values && changes.values.currentValue) {
      this.setValuesFromKeys(changes.values.currentValue.values, false);
    }
    if (changes.questions && changes.questions.currentValue) {
      if (changes.questions.currentValue) {
        this.initialize({
          id: this.formId,
          limitToGroup: this.limitToGroup,
          values: this.values
        });
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected async initialize(data: any) {
    if (!this.formId) {
      return;
    }
    await super.initialize({
      id: this.formId,
      limitToGroup: this.limitToGroup,
      values: this.values
    });

    this.formValueChanges$.subscribe(x => {
      this._storeService.formValuesChanged(
        this.formId,
        this.form,
        this.limitToGroup
      );
    });
  }
}
