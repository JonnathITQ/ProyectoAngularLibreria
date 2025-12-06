import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlMongo } from './urlMongo';
import { Ticket } from '../models/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlMongo.url;
    }

    // Agregar los logs - POST
    // http://localhost:3600/save-ticket
    saveTicket(ticket: Ticket): Observable<any> {
        let params = JSON.stringify(ticket);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-ticket', params, { headers: headers });
    }

    // Obtener lista de tickets - GET
    // http://localhost:3600/tickets
    getTickets(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'tickets', { headers: headers });
    }

    // Actualizar los Tickets - PUT
    // http://localhost:3600/ticket/:id
    updateTicket(ticket: Ticket): Observable<any> {
        let params = JSON.stringify(ticket);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'ticket/' + ticket._id, params, { headers: headers });
    }

    // Visualizar la lista de logs - DELETE
    // http://localhost:3600/save-ticket
    deleteTicket(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'ticket/' + id, { headers: headers });
    }

    // Subir imagen - POST
    // http://localhost:3600/upload-image-ticket/:id
    uploadImage(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file, file.name);
        return this._http.post(this.url + 'upload-image-ticket/' + id, formData);
    }
}
