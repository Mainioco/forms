import { IValidationMessages } from "../interfaces";

export const defaultValidationMessages: IValidationMessages = {
  defaultMessages: [
    {
      error: "required",
      message: "This field is required"
    },
    {
      error: "minlength",
      message: "This field needs to be at least {0} characters long",
      paramValues: ["requiredLength", "A", "B"]
    },
    {
      error: "maxlength",
      message: "This field has too many characters"
    }
  ],
  formSpecific: [],
  questionSpecificMessages: []
};
