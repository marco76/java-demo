import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsrStatusComponent } from './jsr-status.component';

describe('JsrStatusComponent', () => {
  let component: JsrStatusComponent;
  let fixture: ComponentFixture<JsrStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsrStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
