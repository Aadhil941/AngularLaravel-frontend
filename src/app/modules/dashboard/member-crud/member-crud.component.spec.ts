import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCrudComponent } from './member-crud.component';

describe('MemberCrudComponent', () => {
  let component: MemberCrudComponent;
  let fixture: ComponentFixture<MemberCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
