import { Component } from '@angular/core';
import { BurguerComponent } from '../burguer/burguer.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-prestamos',
  imports: [BurguerComponent, FormsModule, NgIf, NgFor],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {

    selectedBook: any = null;

  books: any[] = []; 
  // ← Aquí luego colocarás los libros desde tu API

  selectBook(book: any) {
    this.selectedBook = book;
  }

  solicitarPrestamo() {
    if (!this.selectedBook) return;

    // Luego aquí llamarás al servicio para hacer el POST
    alert(`Solicitud enviada para el libro: ${this.selectedBook.titulo}`);

    this.selectedBook = null;
  }

}
