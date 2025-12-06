import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { EmpleadoService } from "./empleado.service";

@Injectable({
    providedIn: 'root'
})


export class LogsService {
    public url: string;

    constructor(
        private _http: HttpClient,
        private _empleadoService: EmpleadoService,
    ) {
        this.url = urlMongo.url;
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        var token = this._empleadoService.getToken();

        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }

        return headers;
    }

    verLogs(): Observable<any> {
        return this._http.get(this.url + 'logs', { headers: this.getHeaders() });
    }

    crearLogs(data: any): Observable<any> {
        return this._http.post(this.url + 'logs', JSON.stringify(data), { headers: this.getHeaders() });
    }

    verLog(id: string): Observable<any> {
        return this._http.get(this.url + 'logs/' + id, { headers: this.getHeaders() });
    }
}

