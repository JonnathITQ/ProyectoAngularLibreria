import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDeleteUsComponent } from './m-delete-us.component';

describe('MDeleteUsComponent', () => {
  let component: MDeleteUsComponent;
  let fixture: ComponentFixture<MDeleteUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDeleteUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDeleteUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
