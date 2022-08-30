import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSignInComponent } from './dialog-sign-in.component';

describe('DialogSignInComponent', () => {
  let component: DialogSignInComponent;
  let fixture: ComponentFixture<DialogSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
