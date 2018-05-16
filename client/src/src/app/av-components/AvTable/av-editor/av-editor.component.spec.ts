import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvEditorComponent } from './av-editor.component';

describe('AvEditorComponent', () => {
  let component: AvEditorComponent;
  let fixture: ComponentFixture<AvEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
