import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronationDialogComponent } from './coronation-dialog.component';

describe('CoronationDialogComponent', () => {
  let component: CoronationDialogComponent;
  let fixture: ComponentFixture<CoronationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoronationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
