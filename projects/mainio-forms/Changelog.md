# Change log

## Version 1.0.0-beta.8

**Added**

- [**Slider input**] The model and interface are now correctly exported from the library

## Version 1.0.0-beta.7

**Added**

- [**Number Input**] Adds validators for minimum and maximum numerical value
- [**Number Input**] Adds validator error message

**Changes**

- [**Number Input**] No longer limit the values bbby min and max length; use mimimum number and maximum number values

**Removed**

- [**NumberInputQuestionOptions**] removed min and max length from the settings

## Version 1.0.0-beta.6

**Changes**

- [**All inputs**] Added first stage errors to input fields.

**Fixes**

- [**DateInputComponent**] Date is now correctly parsed to date inputs when loaded from string

## Version 1.0.0-beta.5

**Changes**

- [**DropdownInputComponent**] select options ids have been changed. Old syntaxt was use option.key, now the format is question.key + "-"+option.key

**Fixes**

- [**General**] Fixes missing service with AOT builds
- [**DropdownInputComponent**] No longer throw error when creating a selection if groups are not defined for the component

## Version 1.0.0-beta.4

**Fixes**

- [**DynamicStoreFormComponent**] Adds fix where values didn't update form validity to store

## Version 1.0.0-beta.3

**Fixes**

- [**Store**] Question values are now passed to store when they exist on form creation. Updating questions later on doesn't affect the values
- [**DynamicFormComponent**] Don't throw message when values are set that don't have question counterpart

## Version 1.0.0-beta.2

- [**DropdownOptions**] No longer throw error if options are not set when trying to set a value

## Version 1.0.0-beta.1

**Fixes**

- [**FormDataMapperService**,**QuestionDisplayValidatorService**] no longer throw error if no providers are registered in project

## Version 1.0.0-alpha.8

**Added**

- [**IMapConfiguration**] New feature that allows the form values to be mapped. Providing mappers to module configuration allows form values to be automatically mapped when values change. Note that there can be only one registered service per type specified
- [**Store Effects**] Added _FormActionEffects_ that listens to ValueChanged actions and maps the values using IMapConfiguration classes registered
- [**Store**] Added mappedModels
- [**All Forms**,**Store**] Implementation for IMapConfiguration added
- [**DynamicStoreFormComponent**] Is now able to load questions from store

**Changed**

- [**All Forms**] The Forms now emit mapped values if the input binding is given
- [**Store Effects**] Effects are not included within the library module anymore. The effects _FormActionEffects_ and _FormLifecycleEffects_ must be imported to projects module
- [**Documentation**] Updated ReadMe.md to correspond to the current 1.0.0 goals
- [**Store**] Models are now mapped to Option interfaces rather than to question models

## Version 1.0.0-alpha.7

**Added**

- [**All Questions**] It's now possible to add custom RegExp validator string array as options.

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
