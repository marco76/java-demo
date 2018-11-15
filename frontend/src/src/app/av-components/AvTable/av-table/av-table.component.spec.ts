import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvTableComponent } from './av-table.component';

describe('AvTableComponent', () => {
  let component: AvTableComponent;
  let fixture: ComponentFixture<AvTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
