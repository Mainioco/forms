import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingChangerComponent } from './form-setting-changer.component';

describe('FormSettingChangerComponent', () => {
  let component: FormSettingChangerComponent;
  let fixture: ComponentFixture<FormSettingChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSettingChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSettingChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
