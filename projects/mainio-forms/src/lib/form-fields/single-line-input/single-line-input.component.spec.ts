import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineInputComponent } from './single-line-input.component';

describe('SingleLineInputComponent', () => {
  let component: SingleLineInputComponent;
  let fixture: ComponentFixture<SingleLineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLineInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
