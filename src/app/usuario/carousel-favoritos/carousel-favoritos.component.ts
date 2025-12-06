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
  // Recibe desde el componente padre la lista de libros que se mostrarán en este componente.
  // El padre le envía los datos, este componente solo los usa (no los modifica directamente).
  @Input() libros: any[] = [];
  // Evento que el componente emite al padre cuando se quiere eliminar un libro.
  // El padre recibe el libro y decide qué hacer con él (por ejemplo, quitarlo de favoritos).
  @Output() remove = new EventEmitter<any>();
  // Evento que el componente emite cuando se debe abrir un modal.
  // No envía datos, solo notifica al padre para que abra la ventana modal.
  @Output() openModal = new EventEmitter<void>();

  onRemove(libro: any) {
    this.remove.emit(libro);
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
