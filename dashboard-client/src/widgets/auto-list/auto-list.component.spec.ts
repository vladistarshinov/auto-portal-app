import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoListComponent } from './auto-list.component';

describe('AutoListComponent', () => {
  let component: AutoListComponent;
  let fixture: ComponentFixture<AutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
