# Examples

Mainio Forms is the solution for you who're looking for dynamic data driven reactive Angular forms. Glad to have you onboard!

## How to install?

Installing the package is recommended through NPM or Yarn. Call `npm i mainio-forms` if you're working with NPM. For yarn call `yarn add mainio-forms`. The package requires several other packages to be listed. To see full list of dependencies and their uses, refer to NPM Dependencies. To install dependencies with npm, call `npm i @ngrx/store @ngrx/effects rxjs @angular/material @angular/cdk` or using Yarn `yarn add @ngrx/store @ngrx/effects rxjs @angular/material @angular/cdk`

## Configuration

Configuring forms to your project depends on your needs. If you're looking for a solution to NgRx store, refer to Store Configuration. This getting started guides through the basic use.

Firstly, import the `MainioFormsModule` to your project.

```typescript
...
import { MainioFormsModule } from 'mainio-forms';
...

@NgModule({
  imports: [
    ...
    MainioFormsModule
})
export class ExamplesModule {}
```

## Creating first form

Creating forms is straight forward. You need to have a questions that you pass to the Mainio forms component and that's it. Defining component's questions can be done straight within parent component

```typescript
import { Component, OnInit } from "@angular/core";
import { QuestionBase, InputQuestion } from "mainio-forms";

@Component({
  selector: "mainio-form-basic",
  template:
    '<mainio-dynamic-form [questions]="questions" (onSubmit)="log($event)" submitButtonTitle="console.log Me!"></mainio-dynamic-form>',
  styleUrls: ["./basic-form.component.css"]
})
export class BasicFormComponent {
  questions: QuestionBBase<any>[] = [
    new InputQuestion({
      key: "input",
      label: "Type your name"
    })
  ];

  log($event: FormGroup) {
    console.log("Hello! " + $event.value.input);
  }
}
```

Defining submitButtonTitle binding will make the submit button appear next to your fields. By also adding onSubmit event listener you'll get the
submit action back to your component. The values are passed back to log function as a Angular FormGroup. The current values can be accessed using the key identifier specified within creation.

## Conclusion

Getting started is fast, but there's more to the Mainio Dynamic Forms than shown here. For more advanced uses, please refer to Advanced Examples. Or if you wish to know more about the functionalities underneath the components, check API documentation

_[NPM Dependencies]: https://www.npmjs.com/package/mainio-forms?activeTab=dependencies

_[Store Configuration]: store-configuration
