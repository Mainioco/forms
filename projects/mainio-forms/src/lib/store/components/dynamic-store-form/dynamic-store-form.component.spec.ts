import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStoreFormComponent } from './dynamic-store-form.component';

describe('DynamicStoreFormComponent', () => {
  let component: DynamicStoreFormComponent;
  let fixture: ComponentFixture<DynamicStoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
