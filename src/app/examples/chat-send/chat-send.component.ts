import { Component, OnInit } from "@angular/core";
import { InputQuestion } from "mainio-forms";
import { IInputQuestionOptions } from "mainio-forms";
import { FormGroup } from "../../../../node_modules/@angular/forms";

@Component({
  selector: "mainio-form-chat-send",
  templateUrl: "./chat-send.component.html",
  styleUrls: ["./chat-send.component.css"]
})
export class ChatSendComponent implements OnInit {
  inputIsValid: boolean = false;
  options: IInputQuestionOptions = {};
  questions: InputQuestion[] = [
    new InputQuestion({
      type: "input",
      minLength: 5,
      maxLength: 255
    })
  ];
  constructor() {}

  ngOnInit() {}

  updateJson(event: FormGroup) {
    this.inputIsValid = event.valid;
  }
}
