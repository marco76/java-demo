import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterNewsComponent } from './twitter-news.component';

describe('TwitterNewsComponent', () => {
  let component: TwitterNewsComponent;
  let fixture: ComponentFixture<TwitterNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
