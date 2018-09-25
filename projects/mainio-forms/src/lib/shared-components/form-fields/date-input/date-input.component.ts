import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { DateQuestion } from "../../../models/date-question";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { AbstractControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "mainio-form-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent extends FormFieldBaseComponent
  implements OnChanges {
  @Input()
  question: DateQuestion;
  @Input()
  controller: AbstractControl;
  @Output()
  onChange: EventEmitter<Date> = new EventEmitter<Date>();
  _value: Date;
  constructor() {
    super();
  }

  get value(): Date {
    return this._value;
  }
  ngOnInit() {}

  ngOnChanges(changes) {
    super.ngOnChanges(changes);
    this._value = this.question.value || this._value;
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    this.onChange.emit(event.value);
    this._value = event.value;
  }
}
