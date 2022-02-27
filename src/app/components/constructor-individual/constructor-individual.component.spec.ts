import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorIndividualComponent } from './constructor-individual.component';

describe('ConstructorIndividualComponent', () => {
  let component: ConstructorIndividualComponent;
  let fixture: ComponentFixture<ConstructorIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
