import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoListPageComponent } from './auto-list-page.component';

describe('AutoListPageComponent', () => {
  let component: AutoListPageComponent;
  let fixture: ComponentFixture<AutoListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
