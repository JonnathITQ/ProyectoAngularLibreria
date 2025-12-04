import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { urlMongo } from '../../services/urlMongo';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: [TicketService]
})
export class TicketsComponent implements OnInit {
  public tickets: Ticket[];
  public status: string;
  public url: string;

  public showModal: boolean = false;
  public ticketToDeleteId: string | null = null;

  constructor(
    private _ticketService: TicketService
  ) {
    this.tickets = [];
    this.status = '';
    this.url = urlMongo.url;
  }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this._ticketService.getTickets().subscribe(
      response => {
        if (response.tickets) {
          this.tickets = response.tickets;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  toggleStatus(ticket: Ticket) {
    // Cambiar estado localmente primero para feedback inmediato
    ticket.estado = !ticket.estado;

    this._ticketService.updateTicket(ticket).subscribe(
      response => {
        if (!response.ticket) {
          // Revertir si falla
          ticket.estado = !ticket.estado;
          alert('Error al actualizar el estado');
        }
      },
      error => {
        console.log(<any>error);
        // Revertir si falla
        ticket.estado = !ticket.estado;
        alert('Error al actualizar el estado');
      }
    );
  }

  openDeleteModal(id: string) {
    this.ticketToDeleteId = id;
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.ticketToDeleteId = null;
  }

  confirmDelete() {
    if (this.ticketToDeleteId) {
      this._ticketService.deleteTicket(this.ticketToDeleteId).subscribe(
        response => {
          if (response.ticket) {
            this.getTickets(); // Recargar lista
            this.closeDeleteModal();
          }
        },
        error => {
          console.log(<any>error);
          this.closeDeleteModal();
        }
      );
    }
  }
}
