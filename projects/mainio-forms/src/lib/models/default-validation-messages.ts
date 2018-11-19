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
    },
    {
      error: "min",
      message: "The number is too small"
    },
    {
      error: "max",
      message: "The number is too large"
    }
  ],
  formSpecific: [],
  questionSpecificMessages: []
};
