import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlMongo } from './urlMongo';
import { Empleado } from '../models/empleado';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {
    //Almacenará la url base desde la API
    public url: string;

    //Constructor del http client para hacer peticiones HTTP
    constructor(private _http: HttpClient) {
        //Inicializa la url base desde urlMongo.ts
        this.url = urlMongo.url;
    }

    //Método login: Recibe el objeto empleado y hace un post al backend
    //Devuelve un observable que contendrá la respuesta del backend (servidor)
    login(empleado: any): Observable<any> {
        let params = JSON.stringify(empleado); //Esto convierte el objeto que hicimos, en un formato JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Define mediante cabeceros lo que enviamos en JSON
        //vamos a retornar la petición post a la ruta http://localhost:3600/login-empleado, con los datos y headers instanciados
        return this._http.post(this.url + 'login-empleado', params, { headers: headers }); //
    }

    /*
    Aqui vendrán los métodos para los Tokens
    */

    //guarda el token en el localstorage del navegador
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    //Recupera el token desde el localstorage
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    //Guarda la información del empleado en el localstorage como JSON
    setEmpleado(empleado: any): void {
        localStorage.setItem('empleado', JSON.stringify(empleado));
    }

    //Recupera la información del empleado del localstorage (basicamente lo mismo del token pero con empleado)
    getEmpleado(): any {
        let empleado = localStorage.getItem('empleado');
        if (empleado) {
            return JSON.parse(empleado); //Parsea a JSON (Osea, convierte de JSON a objeto)
        } else {
            return null; //En caso que no exista, retornará un null 
        }
    }

    //Cerrar sesión
    //Elimina el token y el empleado del local storage
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('empleado');
    }

    //Autenticación
    //Retornará true si existe un token y false si no
    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token; //el !! convierte el valor a booleano
    }
}
