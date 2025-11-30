import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Usuarios } from "../models/usuarios";


@Injectable()
export class UsuarioService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = urlMongo.url;
    }

    //Lista de los usuarios -GET
    //http://localhost:3600/usuarios
    verUsuarios(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'usuarios', { headers: headers });
    }

    //Ver datos de un usuario por ID - GET
    //http://localhost:3600/usuario/:id
    verUsuario(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'usuario/' + id, { headers: headers });
    }

    //Guardar datos de un usuario - POST
    //http://localhost:3600/guardar-usuarios
    guardarUsuarios(usuario: Usuarios): Observable<any> {
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardar-usuarios', params, { headers: headers });
    }

    //Actualizar datos de un usuario - PUT
    //http://localhost:3600/usuario/:id
    actualizarUsuario(usuario: Usuarios): Observable<any> {
        let params = JSON.stringify(usuario)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'usuario/' + usuario._id, params, { headers: headers });
    }

    //Borrar datos de un usuario - DELETE
    //http://localhost:3600/usuario/:id
    deleteUsuario(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'applications/json');
        return this._http.delete(this.url + 'usuario/' + id, { headers: headers });
    }

    //Subir imagenes para el usuario - POST
    //http://localhost:3600/cargar-imagenUsuario/:id
    subirImagen(id: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imagen', file, file.name);
        return this._http.post(this.url + 'cargar-imagenUsuario/' + id, formData);
    }

    login(usuario: any): Observable<any> {
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login-usuario', params, { headers: headers });
    }

    recuperar(datos: any): Observable<any> {
        let params = JSON.stringify(datos);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'recuperar-contrasenia', params, { headers: headers });
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setUsuario(usuario: any): void {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    getUsuario(): any {
        let usuario = localStorage.getItem('usuario');
        if (usuario) {
            return JSON.parse(usuario);
        } else {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }
}