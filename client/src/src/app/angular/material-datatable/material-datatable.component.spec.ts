import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDatatableComponent } from './material-datatable.component';

describe('MaterialDatatableComponent', () => {
  let component: MaterialDatatableComponent;
  let fixture: ComponentFixture<MaterialDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
