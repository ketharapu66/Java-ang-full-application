import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscreen2Component } from './subscreen2.component';

describe('Subscreen2Component', () => {
  let component: Subscreen2Component;
  let fixture: ComponentFixture<Subscreen2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Subscreen2Component]
    });
    fixture = TestBed.createComponent(Subscreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
