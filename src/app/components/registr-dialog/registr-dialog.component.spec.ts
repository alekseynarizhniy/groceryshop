import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrDialogComponent } from './registr-dialog.component';

describe('RegistrDialogComponent', () => {
  let component: RegistrDialogComponent;
  let fixture: ComponentFixture<RegistrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
