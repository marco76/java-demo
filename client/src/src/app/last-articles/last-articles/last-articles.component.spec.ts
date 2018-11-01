import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastArticlesComponent } from './last-articles.component';

describe('LastArticlesComponent', () => {
  let component: LastArticlesComponent;
  let fixture: ComponentFixture<LastArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
