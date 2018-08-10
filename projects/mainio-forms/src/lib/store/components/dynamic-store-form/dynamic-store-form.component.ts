import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { QuestionBase } from "../../../models/question-base";
import { FormGroup } from "@angular/forms";
import { StoreService } from "../../services/store.service";
import { QuestionControlService } from "../../../services/question-control.service";
import { QuestionGroup } from "../../../models/question-group";

@Component({
  selector: "mainio-form-dynamic-store-form",
  templateUrl: "./dynamic-store-form.component.html",
  styleUrls: ["./dynamic-store-form.component.css"]
})
export class DynamicStoreFormComponent implements OnChanges {
  @Input() useOneRowLayout: boolean;
  @Input() questionsUrl: string;
  @Input() id: string;
  @Input() limitToGroup: string;
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitButtonTitle: string;
  @Input() dontShowDefaultActions: boolean = false;
  @Output() onStatusChage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  displayQuestions: QuestionBase<any>[] = [];
  private initalized: boolean = false;

  form: FormGroup;
  payLoad = "";

  constructor(
    private _storeService: StoreService,
    private qcs: QuestionControlService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.initalized) {
      return;
    }
    this.initialize();
  }

  onSubmitActions() {
    if (!this.onSubmit) {
      return;
    }
    this.onSubmit.emit(this.form);
  }

  private initialize() {
    if (!this.id) {
      return;
    }
    if (!this.questionsUrl) {
      let group: QuestionBase<
        any
      >[] = this._storeService.createFormFromQuestions(
        this.id,
        this.questions,
        this.limitToGroup
      );
      this.form = this.qcs.toFormGroup(group);
      this.displayQuestions = group;
      if (this.form) {
        this.form.valueChanges.subscribe(x => {
          this._storeService.formValuesChanged(this.id, this.form);
        });
      }
    }
    this.initalized = !!this.form;
  }
}
