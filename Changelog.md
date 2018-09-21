# Change log

## Version 1.0.0.alpha-4

**Fixes**

- [**DynamicStoreFormComponent**,**DynamicFormQuestionComponent**] FormLayout enum now correctly changes Form layout

**Added**

- [**StoreService**] Added isFormValid(form:Form) to check if specific store form's questionGroups are valid. Returns false if one group is not valid
- [**StoreService**] Added isStoreFormValid(id:string) to check if a store form with specific id is valid. uses isFormValid(form:Form) internally
- DynamicForm and DynamicStoreForm now use shared styles _form-shared-styles.css_
- Examples now contain more information
- Basic form example demonstrates use for FormLayout enum

**Changed**

- IOptions interface for Dropdown options is now moved to separate file (_i-options.ts_)
- IOptionGroup interface for Dropdown and DropdownSearch options now moved to separate file (_i-option-group.ts_)
