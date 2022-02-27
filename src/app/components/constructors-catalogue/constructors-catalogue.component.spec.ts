import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorsCatalogueComponent } from './constructors-catalogue.component';

describe('ConstructorsCatalogueComponent', () => {
  let component: ConstructorsCatalogueComponent;
  let fixture: ComponentFixture<ConstructorsCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorsCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
