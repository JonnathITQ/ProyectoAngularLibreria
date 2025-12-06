import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDeletePComponent } from './m-delete-p.component';

describe('MDeletePComponent', () => {
  let component: MDeletePComponent;
  let fixture: ComponentFixture<MDeletePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDeletePComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDeletePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
