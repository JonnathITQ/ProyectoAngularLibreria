import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { EmpleadoService } from "./empleado.service";

@Injectable()
export class AdminService {
    public url: string; //Aquí guardaremos la url base de la API que hicimos en el backend

    //Con este constructor haremos inyección de dependencias
    constructor(
        private _http: HttpClient, //Para las peticiones HTTP
        private _empleadoService: EmpleadoService //Para obtener el token del usuario logeado
    ) {
        this.url = urlMongo.url; //Decimos que la url base está en el archivo urlMongo.ts
    }

    private getHeaders(): HttpHeaders { //Construimos los métodos
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Cabecera para indicar que se enviará o recibirá JSON
        var token = this._empleadoService.getToken(); //Se obtendrá el token del usuario ya logueado

        if (token) { //Si hay token, se agrega al header como Authorization: Bearer + token
            headers = headers.set('Authorization', 'Bearer ' + token);
        }

        return headers; //Se devuelven los headers listos para usarse en una petición
    }

    //Lista de admin - GET
    //http://localhost:3600/libros

    verAdmin(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'admins', { headers: this.getHeaders() });
    }

}