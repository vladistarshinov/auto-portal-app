import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCardComponent } from './auto-card.component';

describe('AutoCardComponent', () => {
  let component: AutoCardComponent;
  let fixture: ComponentFixture<AutoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
