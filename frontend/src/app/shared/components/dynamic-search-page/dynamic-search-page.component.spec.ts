import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSearchPageComponent } from './dynamic-search-page.component';

describe('DynamicSearchPageComponent', () => {
  let component: DynamicSearchPageComponent;
  let fixture: ComponentFixture<DynamicSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
