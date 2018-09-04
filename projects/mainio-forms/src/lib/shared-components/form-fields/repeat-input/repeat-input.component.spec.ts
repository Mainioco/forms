import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatInputComponent } from './repeat-input.component';

describe('RepeatInputComponent', () => {
  let component: RepeatInputComponent;
  let fixture: ComponentFixture<RepeatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
