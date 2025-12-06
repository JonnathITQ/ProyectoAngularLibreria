import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";

@Injectable()
export class HistorialService {
    public url: string;

    constructor(
        private _http: HttpClient //Para peticiones HTTP
    ) {
        this.url = urlMongo.url;//url base de mongito
    }

    // Agregar al historial - POST
    // http://localhost:3600/historial
    agregarHistorial(usuarioId: string, libroId: string): Observable<any> {
        let params = JSON.stringify({ usuario: usuarioId, libro: libroId });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'historial', params, { headers: headers });
    }

    // Ver historial de usuario - GET
    // http://localhost:3600/historial/:idUsuario
    verHistorial(usuarioId: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'historial/' + usuarioId, { headers: headers });
    }
}
