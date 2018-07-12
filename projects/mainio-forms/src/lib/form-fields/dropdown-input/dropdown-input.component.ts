import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../../question-base";
import { DropdownQuestion } from "../../dropdown-question";

@Component({
  selector: "mainio-form-dropdown-input",
  templateUrl: "./dropdown-input.component.html",
  styleUrls: ["./dropdown-input.component.css"]
})
export class DropdownInputComponent implements OnInit, OnChanges {
  @Input() question: DropdownQuestion;
  @Input() formGroup: FormGroup;
  selectedOption: string = "";

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.question.controlType === "dropdown") {
      this.selectedOption = this.getSelected();
    }
  }

  setSelection(event) {
    if (this.question.controlType === "dropdown") {
      (this.question as DropdownQuestion).selected = event.value;
    }
  }

  getSelected() {
    if (!(this.question as DropdownQuestion)) {
      return "";
    }
    if (this.question.controlType !== "dropdown") {
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
