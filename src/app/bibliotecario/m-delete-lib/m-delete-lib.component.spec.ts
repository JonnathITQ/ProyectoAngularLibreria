import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDeleteLibComponent } from './m-delete-lib.component';

describe('MDeleteLibComponent', () => {
  let component: MDeleteLibComponent;
  let fixture: ComponentFixture<MDeleteLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDeleteLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDeleteLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
