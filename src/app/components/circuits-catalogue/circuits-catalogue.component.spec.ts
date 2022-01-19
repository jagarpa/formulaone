import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitsCatalogueComponent } from './circuits-catalogue.component';

describe('CircuitsCatalogueComponent', () => {
  let component: CircuitsCatalogueComponent;
  let fixture: ComponentFixture<CircuitsCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitsCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitsCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
