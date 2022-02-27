import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversCatalogueComponent } from './drivers-catalogue.component';

describe('DriversCatalogueComponent', () => {
  let component: DriversCatalogueComponent;
  let fixture: ComponentFixture<DriversCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
