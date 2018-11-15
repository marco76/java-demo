import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvDateComponent } from './bv-date.component';

describe('BvDateComponent', () => {
  let component: BvDateComponent;
  let fixture: ComponentFixture<BvDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
