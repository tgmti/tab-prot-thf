import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageModule, PoInfoModule, PoTableModule } from '@portinari/portinari-ui';

import { ParamsComponent } from './params.component';

describe('ParamsComponent', () => {
  let component: ParamsComponent;
  let fixture: ComponentFixture<ParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageModule,
        PoInfoModule,
        PoTableModule
      ],
      declarations: [ ParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
