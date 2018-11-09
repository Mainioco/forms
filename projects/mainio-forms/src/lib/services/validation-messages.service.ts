import { Injectable, InjectionToken, Optional, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IValidationMessages, IValidationMessage } from "../interfaces";
import { defaultValidationMessages } from "../models";

export interface IMainioValidationMessagesOverride {
  clearExisting: boolean;
  messages: IValidationMessages;
}
export const IValidationMessagesToken = new InjectionToken<
  IMainioValidationMessagesOverride
>("IValidationMessagesToken");

@Injectable({
  providedIn: "root"
})
export class ValidationMessagesService {
  private _messages: IValidationMessages = defaultValidationMessages;

  constructor(
    @Optional()
    @Inject(IValidationMessagesToken)
    messageOverride: IMainioValidationMessagesOverride
  ) {
    if (!messageOverride) return;
    let messages = messageOverride.messages;
    if (!messageOverride.clearExisting) {
      this._messages.formSpecific = messages.formSpecific || [];
      this._messages.questionSpecificMessages =
        messages.questionSpecificMessages || [];
      this._messages.defaultMessages = messages.defaultMessages || [];
      return;
    }
    this._messages.formSpecific = [
      ...this._messages.formSpecific,
      ...(messages.formSpecific ? messages.formSpecific : [])
    ];
    this._messages.questionSpecificMessages = [
      ...this._messages.questionSpecificMessages,
      ...(messages.questionSpecificMessages
        ? messages.questionSpecificMessages
        : [])
    ];
    this._messages.defaultMessages = [
      ...this._messages.defaultMessages,
      ...(messages.defaultMessages ? messages.defaultMessages : [])
    ];
  }

  getValidationMessages(
    control: FormControl,
    questionKey?: string,
    formId?: string
  ): string[] {
    let formErrors: IValidationMessage[] = [];
    let questionErrors: IValidationMessage[] = [];
    if (formId) {
      let a = this._messages.formSpecific.filter(x => x.formId == formId);
      if (questionKey) {
        a.forEach(x => {
          let y = x.questionSpecificMessages.filter(
            x => x.questionKey == questionKey
          );
          let c: IValidationMessage[] = [];
          y.forEach(x => (c = [...c, ...x.messages]));
          formErrors = [...formErrors, ...c, ...x.messages];
        });
      } else {
        a.map(x => {
          let y = x.questionSpecificMessages.filter(
            x => x.questionKey == questionKey
          );
          let c: IValidationMessage[] = [];
          y.forEach(x => (c = [...c, ...x.messages]));
          formErrors = [...formErrors, ...c, ...x.messages];
        });
      }
    }
    if (questionKey) {
      this._messages.questionSpecificMessages
        .filter(x => x.questionKey == questionKey)
        .map(x => {
          questionErrors = [...questionErrors, ...x.messages];
        });
    }
    let all = [
      ...formErrors,
      ...questionErrors,
      ...this._messages.defaultMessages
    ];

    let toRet = all
      .filter(x => {
        return control.hasError(x.error);
      })
      .map(x => {
        if (x.paramValues) {
          let t = x.message;
          let err = control.getError(x.error);
          console.log("err", err, t);
          x.paramValues.forEach((p, index) => {
            if (err[p]) {
              t = x.message.replace("{" + index + "}", err[p]);
            }
          });
          console.log("t", t);
          return t;
        }
        return x.message;
      });
    return toRet;
  }
}
