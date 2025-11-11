import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCars } from './user-cars';

describe('UserCars', () => {
  let component: UserCars;
  let fixture: ComponentFixture<UserCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
