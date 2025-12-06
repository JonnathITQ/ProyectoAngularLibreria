import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-contacto',
  standalone: true,// Indica que este componente es standalone (no necesita un módulo).
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  // Proveedor del servicio TicketService solo para este componente.
  // Esto crea una nueva instancia de TicketService aislada.
  providers: [TicketService]
})
export class ContactoComponent implements OnInit {
  // Objeto donde se almacenan los datos del formulario de ticket.
  public ticket: Ticket;
  // Indica si ocurrió éxito ('success') o error ('failed').
  public status: string;
  // Archivo que el usuario suba desde el formulario (puede ser null).
  public fileToUpload: File | null = null;

  // Inyección del servicio de tickets para trabajar con el backend.
  constructor(
    private _ticketService: TicketService
  ) {
    // Inicialización del ticket vacío.
    this.ticket = new Ticket('', '', '', '', '', false, new Date(), '');
    // Estado inicial vacío.
    this.status = '';
  }

  // Método que se ejecuta al inicializar el componente.
  ngOnInit(): void {
  }

  // Método que se ejecuta cuando el usuario selecciona un archivo.
  // Guarda el archivo seleccionado en la variable fileToUpload.
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // Método que se ejecuta al enviar el formulario.
  onSubmit(form: any) {
    // Primero se guarda el ticket SIN imagen (solo texto).
    this._ticketService.saveTicket(this.ticket).subscribe(
      response => {
        // Si el backend devolvió un ticket, significa que se guardó correctamente.
        if (response.ticket) {
          // Verificar si el usuario seleccionó una imagen
          if (this.fileToUpload) {
            // Subir la imagen al backend usando el ID del ticket recién creado.
            this._ticketService.uploadImage(response.ticket._id, this.fileToUpload).subscribe(
              result => {
                // Éxito al subir imagen.
                this.status = 'success';
                // Resetear formulario.
                form.reset();
                // Resetear archivo.
                this.fileToUpload = null;
              },
              error => {
                // Error al subir la imagen.
                console.log(<any>error);
                this.status = 'failed';
              }
            );
          } else {
            // Si no hay imagen, igual marcamos éxito.
            this.status = 'success';
            form.reset();
          }
        } else {
          // Si no devuelve un ticket entonces dará error del backend.
          this.status = 'failed';
        }
      },
      // Error al guardar ticket (sin imagen).
      error => {
        console.log(<any>error);
        this.status = 'failed';
      }
    );
  }
}
