import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBucketComponent } from './dialog-bucket.component';

describe('DialogBucketComponent', () => {
  let component: DialogBucketComponent;
  let fixture: ComponentFixture<DialogBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBucketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
