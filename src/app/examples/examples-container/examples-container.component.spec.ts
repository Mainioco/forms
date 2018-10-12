import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesContainerComponent } from './examples-container.component';

describe('ExamplesContainerComponent', () => {
  let component: ExamplesContainerComponent;
  let fixture: ComponentFixture<ExamplesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
