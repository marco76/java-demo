import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvListEmail } from './bv-list-email.component';

describe('BvRepeatableComponent', () => {
  let component: BvListEmail;
  let fixture: ComponentFixture<BvListEmail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvListEmail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvListEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
