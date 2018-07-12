import { FormFieldsModule } from './form-fields.module';

describe('FormFieldsModule', () => {
  let formFieldsModule: FormFieldsModule;

  beforeEach(() => {
    formFieldsModule = new FormFieldsModule();
  });

  it('should create an instance', () => {
    expect(formFieldsModule).toBeTruthy();
  });
});
