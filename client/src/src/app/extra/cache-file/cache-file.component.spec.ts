import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheFileComponent } from './cache-file.component';

describe('CacheFileComponent', () => {
  let component: CacheFileComponent;
  let fixture: ComponentFixture<CacheFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
