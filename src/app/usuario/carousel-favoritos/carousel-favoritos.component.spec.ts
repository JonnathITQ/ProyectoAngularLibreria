import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFavoritosComponent } from './carousel-favoritos.component';

describe('CarouselFavoritosComponent', () => {
  let component: CarouselFavoritosComponent;
  let fixture: ComponentFixture<CarouselFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselFavoritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
