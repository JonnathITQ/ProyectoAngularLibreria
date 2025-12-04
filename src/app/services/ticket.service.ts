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

    saveTicket(ticket: Ticket): Observable<any> {
        let params = JSON.stringify(ticket);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-ticket', params, { headers: headers });
    }

    getTickets(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'tickets', { headers: headers });
    }

    updateTicket(ticket: Ticket): Observable<any> {
        let params = JSON.stringify(ticket);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'ticket/' + ticket._id, params, { headers: headers });
    }

    deleteTicket(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'ticket/' + id, { headers: headers });
    }

    uploadImage(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file, file.name);
        return this._http.post(this.url + 'upload-image-ticket/' + id, formData);
    }
}
