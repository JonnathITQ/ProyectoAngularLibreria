import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-favoritos.component.html',
  styleUrl: './carousel-favoritos.component.css'
})
export class CarouselFavoritosComponent {
  @Input() libros: any[] = [];
  @Output() remove = new EventEmitter<any>();
  @Output() openModal = new EventEmitter<void>();

  onRemove(libro: any) {
    this.remove.emit(libro);
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
