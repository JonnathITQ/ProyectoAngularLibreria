import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Usuarios } from "../models/usuarios";


@Injectable({
    providedIn: 'root'
})
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

    //Login para el usuario - POST
    //http://localhost:3600/login-usuario
    login(usuario: any): Observable<any> {
        let params = JSON.stringify(usuario); //Convertimos el objeto a JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Encabezados HTTP
        return this._http.post(this.url + 'login-usuario', params, { headers: headers }); //Para poder tener el endpoint
    }

    //Recuperar la contraseña - POST
    //http://localhost:3600/recuperar-contrasenia
    recuperar(datos: any): Observable<any> {
        let params = JSON.stringify(datos);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'recuperar-contrasenia', params, { headers: headers });
    }

    //Guarda el token del usuario en el localStorage del navegador
    setToken(token: string): void {
        localStorage.setItem('token_usuario', token);// 'token_usuario' será la clave con la que se almacenará el token
    }

    // Obtiene el token guardado en el localStorage
    getToken(): string | null {
        return localStorage.getItem('token_usuario');// Si no existe, localStorage devuelve null
    }

    // Guarda un objeto "usuario" en el localStorage
    setUsuario(usuario: any): void {
        localStorage.setItem('usuario', JSON.stringify(usuario));// Como localStorage solo almacena strings, se convierte a JSON
    }

    // Obtiene el usuario almacenado en el localStorage
    getUsuario(): any {
        let usuario = localStorage.getItem('usuario');// Se obtiene el valor guardado
        // Si existe, se lo convierte nuevamente a objeto
        if (usuario) {
            return JSON.parse(usuario);
            // Si no existe, retorna null
        } else {
            return null;
        }
    }

    // Cierra la sesión del usuario
    logout(): void {
        localStorage.removeItem('token_usuario'); //Quita el token
        localStorage.removeItem('usuario'); //Quita las credenciales que estaban en formato JSON
    }

    //Autenticación
    //Retornará true si existe un token y false si no
    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token; //el !! convierte el valor a booleano
    }
}