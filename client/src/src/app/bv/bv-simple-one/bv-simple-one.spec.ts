import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvComponent } from './bv-simple-one';

describe('BvComponent', () => {
  let component: BvComponent;
  let fixture: ComponentFixture<BvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
