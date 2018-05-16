import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvExampleComponent } from './av-example.component';

describe('AvExampleComponent', () => {
  let component: AvExampleComponent;
  let fixture: ComponentFixture<AvExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
