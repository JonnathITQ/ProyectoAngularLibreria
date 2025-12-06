import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { EmpleadoService } from "./empleado.service";

@Injectable(
    {
        providedIn: 'root'
    }
)


export class EstadisticasService {
    public url: string;

    constructor(
        private _http: HttpClient,
        private _empleadoService: EmpleadoService
    ) {
        this.url = urlMongo.url;
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        const token = this._empleadoService.getToken(); // ← de tu login

        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }

        return headers;
    }

    getEstadisticaUsuarios(): Observable<any> {
        return this._http.get(this.url + 'usuarios-estadistica', { headers: this.getHeaders() });
    }

    getlibrosFavoritos(): Observable<any> {
        return this._http.get(this.url + 'librosFavoritos-estadistica', { headers: this.getHeaders() });
    }

}
