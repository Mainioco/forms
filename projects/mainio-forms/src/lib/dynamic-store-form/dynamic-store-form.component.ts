import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { QuestionBase } from "../models/question-base";
import { FormGroup } from "@angular/forms";
import { StoreService } from "../store/services/store.service";

@Component({
  selector: "mainio-form-dynamic-store-form",
  templateUrl: "./dynamic-store-form.component.html",
  styleUrls: ["./dynamic-store-form.component.css"]
})
export class DynamicStoreFormComponent implements OnInit, OnChanges {
  @Input() useOneRowLayout: boolean;
  @Input() questionsUrl: string;
  @Input() id: string;
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitButtonTitle: string;
  @Input() dontShowDefaultActions: boolean = false;
  @Output() onStatusChage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  payLoad = "";

  constructor(private qcs: StoreService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.id) {
      console.error("Store form requires ID of the form");
      return;
    }
    if (!this.questionsUrl) {
      this.form = this.qcs.createFormFromQuestions(this.id, this.questions);
    }
  }

  onSubmitActions() {
    if (!this.onSubmit) {
      return;
    }
    this.onSubmit.emit(this.form);
  }
}
