import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Libros } from "../models/libros";

@Injectable()

export class LibrosService {

    public url: string

    constructor(
        private _http: HttpClient
    ) {
        this.url = urlMongo.url;
    }

    //Lista de libros - GET
    //http://localhost:3600/libros

    verLibros(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'libros', { headers: headers });
    }

    //Ver datos de un libro en concreto (por ID) - GET
    //http://localhost:3600/libros/:id
    verLibro(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'libros/' + id, { headers: headers });

    }

    //Guardar datos de un libro - POST
    //http://localhost:3600/guardar-libros
    guardarLibros(libros: Libros): Observable<any> {
        let params = JSON.stringify(libros);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardar-libros', params, { headers: headers });
    }

    //Actualizar datos de un libro - PUT
    //http://localhost:3600/libros/:id
    actualizarLibros(libros: Libros): Observable<any> {
        let params = JSON.stringify(libros);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'libros/' + libros._id, params, { headers: headers });
    }

    //Borrar libros - DELETE
    deleteLibro(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'libros/' + id, { headers: headers });
    }

    //Subir imagenes para el usuario - POST
    //http://localhost:3600/subir-portada/:id
    subirImagen(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('portada', file, file.name);
        return this._http.post(this.url + 'subir-portada/' + id, formData);
    }
}