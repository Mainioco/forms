import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonCreatorComponent } from './json-creator.component';

describe('JsonCreatorComponent', () => {
  let component: JsonCreatorComponent;
  let fixture: ComponentFixture<JsonCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
