import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRents } from './my-rents';

describe('MyRents', () => {
  let component: MyRents;
  let fixture: ComponentFixture<MyRents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
