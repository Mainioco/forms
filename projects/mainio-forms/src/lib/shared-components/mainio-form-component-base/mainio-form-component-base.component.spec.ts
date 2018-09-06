import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainioFormComponentBaseComponent } from './mainio-form-component-base.component';

describe('MainioFormComponentBaseComponent', () => {
  let component: MainioFormComponentBaseComponent;
  let fixture: ComponentFixture<MainioFormComponentBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainioFormComponentBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainioFormComponentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
