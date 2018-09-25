# Change log

## Version 1.0.0-alpha.6

**Fixes**

- [**DynamicStoreFormComponent**,**DynamicFormQuestionComponent**] values are now correctly parsed if passed to bindings
- [**DateQuestion**] is now correctly exported from library
- [**RepeatInput**] the values passed are now correctly parsed to each repeat inputs
- [**DynamicStoreFormComponent**] On changes the form is no longer created but updated if the store has a form created by specified ID

**Improvements**

- [**Store**] if now question group is not defined for a question, it'll be passed to a default question defined by either as within **MainioFormsStoreConfig** or as 'no-group' if no values set
- [**Store**] On _ValuesChanged_ action, the values are also passed to question's value

**Added**

- [**Store**] Added save values for each form.
- [**Store**] Added actions _ClearValues_, _SaveValues_
- [**Store**] Added effect _FormLifecycleEffects_ that informs _StoreService_ when new forms are created to store
- [**MainioFormsStoreConfig**] Added default group name parameter

**Changed**

- [**IFormGroupCreator**] now uses ES6 async promise approach instead of Observable. The factories **QuestionControlService**,**StoreService**
- [**Form Question**] the container component now creates a local copy of question passed to overcome store freeze situations where **DateQuestion** wouldn't work as intended

## Version 1.0.0-alpha.5

**Fixes**

- IOptions and IOptionGroup interfaces are exported correctly from library

## Version 1.0.0-alpha.4

**Fixes**

- [**DynamicStoreFormComponent**,**DynamicFormQuestionComponent**] FormLayout enum now correctly changes Form layout

**Added**

- [**StoreService**] Added isFormValid(form:Form) to check if specific store form's questionGroups are valid. Returns false if one group is not valid
- [**StoreService**] Added isStoreFormValid(id:string) to check if a store form with specific id is valid. uses isFormValid(form:Form) internally
- DynamicForm and DynamicStoreForm now use shared styles _form-shared-styles.css_

**Changed**

- IOptions interface for Dropdown options is now moved to separate file (_i-options.ts_)
- IOptionGroup interface for Dropdown and DropdownSearch options now moved to separate file (_i-option-group.ts_)
