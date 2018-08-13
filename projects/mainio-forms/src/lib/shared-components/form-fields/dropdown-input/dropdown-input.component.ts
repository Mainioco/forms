import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../../../models/question-base";
import { DropdownQuestion } from "../../../models/dropdown-question";
import { ControlType } from "../../../models/control-type.enum";

@Component({
  selector: "mainio-form-dropdown-input",
  templateUrl: "./dropdown-input.component.html",
  styleUrls: ["./dropdown-input.component.css"]
})
export class DropdownInputComponent implements OnInit, OnChanges {
  @Input()
  question: DropdownQuestion;
  @Input()
  formGroup: FormGroup;
  selectedOption: string = "";

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.question.controlType === ControlType.Dropdown) {
      this.selectedOption = this.getSelected();
    }
  }

  setSelection(event) {
    if (this.question.controlType === ControlType.Dropdown) {
      (this.question as DropdownQuestion).selected = event.value;
    }
  }

  getSelected() {
    if (!(this.question as DropdownQuestion)) {
      return "";
    }
    if (this.question.controlType !== ControlType.Dropdown) {
      return "";
    }
    let a: DropdownQuestion = this.question as DropdownQuestion;
    let x = a.getSelected();
    if (!x) {
      return "";
    }
    if (!x.key) {
      return "";
    }
    return x.key;
  }
}