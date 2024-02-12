import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscreen1Component } from './subscreen1.component';

describe('Subscreen1Component', () => {
  let component: Subscreen1Component;
  let fixture: ComponentFixture<Subscreen1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Subscreen1Component]
    });
    fixture = TestBed.createComponent(Subscreen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
