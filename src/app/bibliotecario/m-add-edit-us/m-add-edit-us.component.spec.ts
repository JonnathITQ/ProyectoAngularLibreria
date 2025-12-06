import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddEditUsComponent } from './m-add-edit-us.component';

describe('MAddEditUsComponent', () => {
  let component: MAddEditUsComponent;
  let fixture: ComponentFixture<MAddEditUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAddEditUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAddEditUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
