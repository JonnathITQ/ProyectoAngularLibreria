import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlMongo } from './urlMongo';
import { Empleado } from '../models/empleado';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = urlMongo.url;
    }

    login(empleado: any): Observable<any> {
        let params = JSON.stringify(empleado);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login-empleado', params, { headers: headers });
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setEmpleado(empleado: any): void {
        localStorage.setItem('empleado', JSON.stringify(empleado));
    }

    getEmpleado(): any {
        let empleado = localStorage.getItem('empleado');
        if (empleado) {
            return JSON.parse(empleado);
        } else {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('empleado');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token;
    }
}
