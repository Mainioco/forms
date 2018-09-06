import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitStoreComponent } from './split-store.component';

describe('SplitStoreComponent', () => {
  let component: SplitStoreComponent;
  let fixture: ComponentFixture<SplitStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
