import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-seleccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-seleccion.component.html',
  styleUrl: './modal-seleccion.component.css'
})
export class ModalSeleccionComponent {
  @Input() isVisible: boolean = false;
  @Input() todosLibros: any[] = [];
  @Input() librosFavoritos: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  public libroSeleccionado: any = null;

  // Lógica cuando se selecciona un libro del menú desplegable
  onLibroSelect() {
  }

  esFavorito(libro: any): boolean {
    if (!libro) return false;
    return this.librosFavoritos.some(f => f._id === libro._id);
  }

  toggleFavorito(libro: any) {
    if (this.esFavorito(libro)) {
      // Necesitamos modificar la matriz en su lugar o emitir un evento. 
      // Dado que estamos pasando por referencia, modificar la matriz aquí podría reflejarse en el padre,
      // pero es mejor dejar que el padre lo maneje o tener cuidado.
      const index = this.librosFavoritos.findIndex(f => f._id === libro._id);
      if (index > -1) {
        this.librosFavoritos.splice(index, 1);
      }
    } else {
      this.librosFavoritos.push(libro);
    }
  }

  closeModal() {
    this.libroSeleccionado = null;
    this.close.emit();
  }

  saveChanges() {
    this.save.emit();
  }
}
