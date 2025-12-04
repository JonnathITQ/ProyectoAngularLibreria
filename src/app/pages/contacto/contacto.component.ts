import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [TicketService]
})
export class ContactoComponent implements OnInit {
  public ticket: Ticket;
  public status: string;
  public fileToUpload: File | null = null;

  constructor(
    private _ticketService: TicketService
  ) {
    this.ticket = new Ticket('', '', '', '', '', false, new Date(), '');
    this.status = '';
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(form: any) {
    this._ticketService.saveTicket(this.ticket).subscribe(
      response => {
        if (response.ticket) {
          // Si hay imagen para subir
          if (this.fileToUpload) {
            this._ticketService.uploadImage(response.ticket._id, this.fileToUpload).subscribe(
              result => {
                this.status = 'success';
                form.reset();
                this.fileToUpload = null;
              },
              error => {
                console.log(<any>error);
                this.status = 'failed';
              }
            );
          } else {
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'failed';
      }
    );
  }
}
