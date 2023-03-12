import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopartsPageComponent } from './autoparts-page.component';

describe('AutopartsPageComponent', () => {
  let component: AutopartsPageComponent;
  let fixture: ComponentFixture<AutopartsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutopartsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutopartsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
