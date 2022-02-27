import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversIndividualComponent } from './drivers-individual.component';

describe('DriversIndividualComponent', () => {
  let component: DriversIndividualComponent;
  let fixture: ComponentFixture<DriversIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
