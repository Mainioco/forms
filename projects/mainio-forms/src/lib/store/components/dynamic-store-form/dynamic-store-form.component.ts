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

@Component({
  selector: "mainio-form-dynamic-store-form",
  templateUrl: "./dynamic-store-form.component.html",
  styleUrls: ["./dynamic-store-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicStoreFormComponent implements OnChanges {
  @Input()
  formLayout: FormLayout;
  @Input()
  questionsUrl: string;
  @Input()
  id: string;
  @Input()
  limitToGroup: string;
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
  displayQuestions: QuestionBase<any>[] = [];
  private initalized: boolean = false;
  displayGroups: IDisplayGroup[] = [];
  form: FormGroup;
  payLoad = "";

  constructor(
    private _storeService: StoreService,
    private qcs: QuestionControlService
  ) {}

  get formClass(): string {
    switch (this.formLayout) {
      case FormLayout.Col_1:
      case FormLayout.Col_2:
        return "column-form";
      default:
        return "row-form";
    }
  }
  ngOnChanges(changes: SimpleChanges) {
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
      console.log("group is ", group, this.limitToGroup);
      this.displayQuestions = group;
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
        this.form.valueChanges.subscribe(x => {
          this._storeService.formValuesChanged(
            this.id,
            this.form,
            this.limitToGroup
          );
        });
      }
    }
    this.initalized = !!this.form;
  }
}
