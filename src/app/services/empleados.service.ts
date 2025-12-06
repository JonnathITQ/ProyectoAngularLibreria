import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Empleado } from '../models/empleado';
import { EmpleadoService } from './empleado.service';

@Injectable({
    providedIn: 'root'
})
export class EmpleadosService {
    public url: string

    constructor(
        private _http: HttpClient,
        private _empleadoService: EmpleadoService
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

    //Lista de libros - GET
    //http://localhost:3600/libros
    verEmpleados(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'empleados', { headers: this.getHeaders() });
    }

    //Ver datos de un libro en concreto (por ID) - GET
    //http://localhost:3600/libros/:id
    verEmpleado(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'empleados/' + id, { headers: this.getHeaders() });

    }

    //Guardar datos de un libro - POST
    //http://localhost:3600/guardar-libros
    guardarEmpleados(empleado: Empleado): Observable<any> {
        let params = JSON.stringify(empleado);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardar-empleado', params, { headers: this.getHeaders() });
    }

    //Actualizar datos de un libro - PUT
    //http://localhost:3600/libros/:id
    actualizarEmpleados(empleado: Empleado): Observable<any> {
        let params = JSON.stringify(empleado);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'empleados/' + empleado._id, params, { headers: this.getHeaders() });
    }

    //Borrar libros - DELETE
    deleteEmpleados(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'empleados/' + id, { headers: this.getHeaders() });
    }
}
