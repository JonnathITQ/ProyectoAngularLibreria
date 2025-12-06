import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddEditPComponent } from './m-add-edit-p.component';

describe('MAddEditPComponent', () => {
  let component: MAddEditPComponent;
  let fixture: ComponentFixture<MAddEditPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAddEditPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAddEditPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
