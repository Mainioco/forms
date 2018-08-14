import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitStoreFormComponent } from './split-store-form.component';

describe('SplitStoreFormComponent', () => {
  let component: SplitStoreFormComponent;
  let fixture: ComponentFixture<SplitStoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitStoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
