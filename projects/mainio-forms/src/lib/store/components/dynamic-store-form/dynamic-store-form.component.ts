import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { QuestionBase } from "../../../models/question-base";
import { FormGroup } from "@angular/forms";
import { StoreService } from "../../services/store.service";
import { QuestionControlService } from "../../../services/question-control.service";
import { QuestionGroup } from "../../../models/question-group";
import { FormLayout } from "../../../models";
import { IDisplayGroup } from "../../../interfaces/i-display-group";
import { MainioFormComponentBaseComponent } from "../../../shared-components/mainio-form-component-base/mainio-form-component-base.component";

@Component({
  selector: "mainio-form-dynamic-store-form",
  templateUrl: "./dynamic-store-form.component.html",
  styleUrls: ["./dynamic-store-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicStoreFormComponent extends MainioFormComponentBaseComponent {
  @Input()
  submitButtonTitle: string;
  @Input()
  dontShowDefaultActions: boolean = false;
  @Output()
  onStatusChage: EventEmitter<any> = new EventEmitter<any>();

  payLoad = "";

  constructor(private _storeService: StoreService) {
    super(_storeService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.questions && changes.questions.currentValue) {
      if (changes.questions.currentValue) {
        this.initialize({ id: this.formId, limitToGroup: this.limitToGroup });
      }
    }
    if (changes.values && changes.values.currentValue) {
      this.setValuesFromKeys(changes.values.currentValue.values);
    }
  }

  protected initialize(data: any) {
    if (!this.formId) {
      return;
    }
    super.initialize({ id: this.formId, limitToGroup: this.limitToGroup });

    this.formValueChanges$.subscribe(x => {
      this._storeService.formValuesChanged(
        this.formId,
        this.form,
        this.limitToGroup
      );
    });
  }
}
