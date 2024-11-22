import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfEmployeeComponent } from './list-of-employee.component';

describe('ListOfEmployeeComponent', () => {
  let component: ListOfEmployeeComponent;
  let fixture: ComponentFixture<ListOfEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
