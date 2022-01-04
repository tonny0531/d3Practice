import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBMapComponent } from './cbmap.component';

describe('CBMapComponent', () => {
  let component: CBMapComponent;
  let fixture: ComponentFixture<CBMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CBMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CBMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
