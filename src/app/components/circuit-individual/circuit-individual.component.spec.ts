import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitIndividualComponent } from './circuit-individual.component';

describe('CircuitIndividualComponent', () => {
  let component: CircuitIndividualComponent;
  let fixture: ComponentFixture<CircuitIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
