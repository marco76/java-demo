import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvColumnPropertiesComponent } from './av-column-properties.component';

describe('AvColumnPropertiesComponent', () => {
  let component: AvColumnPropertiesComponent;
  let fixture: ComponentFixture<AvColumnPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvColumnPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvColumnPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
