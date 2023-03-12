import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBrandComponent } from './auto-brand.component';

describe('AutoBrandComponent', () => {
  let component: AutoBrandComponent;
  let fixture: ComponentFixture<AutoBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
