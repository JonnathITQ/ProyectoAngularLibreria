import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddEditLibComponent } from './m-add-edit-lib.component';

describe('MAddEditLibComponent', () => {
  let component: MAddEditLibComponent;
  let fixture: ComponentFixture<MAddEditLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAddEditLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAddEditLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
