import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { Usuarios } from "../models/usuario.model";


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

    private getAuthHeaders(contentType: string = 'application/json'): HttpHeaders {
        const token = this.getToken(); // Obtener el token de localStorage
        let headers = new HttpHeaders().set('Content-Type', contentType);

        if (token) {

            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }


    verUsuarios(): Observable<any> {
        let headers = this.getAuthHeaders(); // Usar Auth Headers si esta ruta es protegida
        return this._http.get(this.url + 'usuarios', { headers: headers });
    }

    verUsuario(id: String): Observable<any> {
        let headers = this.getAuthHeaders(); // Usar Auth Headers si esta ruta es protegida
        return this._http.get(this.url + 'usuario/' + id, { headers: headers });
    }


    guardarUsuarios(usuario: Usuarios): Observable<any> {
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardar-usuarios', params, { headers: headers });
    }

    actualizarUsuario(usuario: Usuarios): Observable<any> {
        let params = JSON.stringify(usuario)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'usuario/' + usuario._id, params, { headers: headers });
    }


    actualizarDatosPerfil(usuario: any): Observable<any> {

        const datosActualizar = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            descripcion: usuario.descripcion
        };

        let params = JSON.stringify(datosActualizar);
        let headers = this.getAuthHeaders();

        return this._http.put(this.url + 'usuario/' + usuario._id + '/datos', params, { headers: headers });
    }


    cambiarContrasena(id: String, currentPassword: string, newPassword: string): Observable<any> {
        const datos = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        let params = JSON.stringify(datos);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'usuario/' + id + '/contrasena', params, { headers: headers });
    }


    deleteUsuario(id: String): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'applications/json');
        return this._http.delete(this.url + 'usuario/' + id, { headers: headers });
    }

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

    //MÉTODOS PARA FAVORITOS

    getFavoritos(): Observable<any[]> {
        // USAR HEADERS CON AUTORIZACIÓN
        let headers = this.getAuthHeaders();
        return this._http.get<any[]>(this.url + 'favoritos', { headers: headers });
    }

    /**
     * Alterna el estado de favorito de un libro.
     */
    toggleFavorito(libroId: string): Observable<{ message: string, isFavorite: boolean }> {
        // USAR HEADERS CON AUTORIZACIÓN
        let headers = this.getAuthHeaders();
        return this._http.post<{ message: string, isFavorite: boolean }>(
            this.url + 'favorito/' + libroId,
            {}, // El cuerpo es vacío
            { headers: headers }
        );
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

    isAuthenticated():boolean{
        const token = this.getToken();
        return !!token;
    }

        logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }
}
