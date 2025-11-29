import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Prestamos } from "../models/prestamos";

@Injectable()
export class PrestamosService {

    public url: string

    constructor(
        private _http: HttpClient
    ) {
        this.url = urlMongo.url;
    }

    // Ver todos los prestamos - GET
    //http://localhost:3600/listaPrestamos
    verPrestamos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listaPrestamos', { headers: headers });
    }

    // Ver prestamo en específico - GET
    //http://localhost:3600/listaPrestamos/:id
    verPrestamo(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'listaPrestamos/' + id, { headers: headers });
    }

    // Guardar Prestamo - POST
    //http://localhost:3600/guardarPrestamo
    guardarPrestamo(prestamo: Prestamos): Observable<any> {
        let params = JSON.stringify(prestamo);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardarPrestamo', params, { headers: headers });
    }

    // Actualizar Prestamo - PUT
    //http://localhost:3600/actualizarPrestamo/:id
    actualizarPrestamo(prestamo: Prestamos): Observable<any> {
        let params = JSON.stringify(prestamo);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'actualizarPrestamo/' + prestamo._id, params, { headers: headers });
    }

    // Borrar Prestamo - DELETE
    //http://localhost:3600/borrarPrestamo/:id
    borrarPrestamo(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'borrarPrestamo/' + id, { headers: headers });
    }
}
