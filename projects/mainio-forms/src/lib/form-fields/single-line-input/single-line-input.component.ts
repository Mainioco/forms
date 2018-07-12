import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "../../question-base";
import { InputQuestion } from "../../input-question";

@Component({
  selector: "mainio-form-single-line-input",
  templateUrl: "./single-line-input.component.html",
  styleUrls: ["./single-line-input.component.css"]
})
export class SingleLineInputComponent implements OnInit {
  @Input() question: InputQuestion;
  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}
}
