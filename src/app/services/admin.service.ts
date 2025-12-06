import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { EmpleadoService } from "./empleado.service";

@Injectable()
export class AdminService {
    public url: string;

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

    //Lista de admin - GET
    //http://localhost:3600/libros

    verAdmin(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'admins', { headers: this.getHeaders() });
    }

}