import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvRepeatableComponent } from './bv-repeatable.component';

describe('BvRepeatableComponent', () => {
  let component: BvRepeatableComponent;
  let fixture: ComponentFixture<BvRepeatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvRepeatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvRepeatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
