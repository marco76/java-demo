import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvSimpleOneComponent } from './bv-simple-one';

describe('BvComponent', () => {
  let component: BvSimpleOneComponent;
  let fixture: ComponentFixture<BvSimpleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvSimpleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvSimpleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
