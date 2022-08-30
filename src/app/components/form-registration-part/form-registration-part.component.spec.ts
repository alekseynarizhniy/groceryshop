import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistrationPartComponent } from './form-registration-part.component';

describe('FormRegistrationPartComponent', () => {
  let component: FormRegistrationPartComponent;
  let fixture: ComponentFixture<FormRegistrationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistrationPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistrationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
