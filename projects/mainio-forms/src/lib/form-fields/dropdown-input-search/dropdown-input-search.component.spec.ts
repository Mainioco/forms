import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownInputSearchComponent } from './dropdown-input-search.component';

describe('DropdownInputSearchComponent', () => {
  let component: DropdownInputSearchComponent;
  let fixture: ComponentFixture<DropdownInputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownInputSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
