import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { SliderQuestion } from "../../../models/slider-question";
import { FormFieldBaseComponent } from "../form-field-base/form-field-base.component";
import { AbstractControl } from "@angular/forms";

@Component({
  selector: "mainio-form-slider-input",
  templateUrl: "./slider-input.component.html",
  styleUrls: ["./slider-input.component.css"]
})
export class SliderInputComponent extends FormFieldBaseComponent
  implements OnInit {
  @Input()
  question: SliderQuestion;
  @Input()
  controller: AbstractControl;
  selectedValues: number[] = [0, 0];
  selectedValue: number;
  visible: boolean;
  constructor() {
    super();
  }

  ngOnInit() {
    this.visible = false;
    setTimeout(() => (this.visible = true), 0);
    if (this.question.isRange) this.selectedValues = this.question.value;
    else this.selectedValue = this.question.value;
  }
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.visible = false;
    setTimeout(() => (this.visible = true), 0);
    if (this.question.isRange) this.selectedValues = this.question.value;
    else this.selectedValue = this.question.value;
  }

  handleChange(event) {
    if (this.controller) {
      this.controller.setValue(
        this.question.isRange ? this.selectedValues : this.selectedValue,
        {
          onlySelf: false,
          emitEvent: true
        }
      );
    }
  }
}
