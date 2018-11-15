import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvFormElementComponent } from './av-form-element.component';

describe('AvFormElementComponent', () => {
  let component: AvFormElementComponent;
  let fixture: ComponentFixture<AvFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvFormElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
