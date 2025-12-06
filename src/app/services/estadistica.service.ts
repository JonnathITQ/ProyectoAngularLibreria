import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";
import { Observable } from "rxjs";
import { EmpleadoService } from "./empleado.service";

@Injectable(
    {
        providedIn: 'root'
    }
)


export class EstadisticasService {
    public url: string;

    constructor(
        private _http: HttpClient,// Cliente HTTP para hacer peticiones al backend
        private _empleadoService: EmpleadoService// Servicio para obtener el token del empleado
    ) {
        this.url = urlMongo.url;// URL base del backend
    }

    // Método privado que construye los headers para cada petición HTTP
    private getHeaders(): HttpHeaders {
        // Se crea el header básico con JSON como tipo de contenido
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        // Intentamos obtener el token JWT guardado
        const token = this._empleadoService.getToken();
        // Si existe un token, lo agregamos al header de autorización
        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }
        // Retornamos los headers completos
        return headers;
    }


    // Obtener las estadísticas de los usuarios - GET
    // http://localhost:3600/usuarios-estadistica
    getEstadisticaUsuarios(): Observable<any> {
        return this._http.get(this.url + 'usuarios-estadistica', { headers: this.getHeaders() });
    }

    // Obtener las estadísticas de los libros más populares - GET
    // http://localhost:3600/librosFavoritos-estadistica
    getlibrosFavoritos(): Observable<any> {
        return this._http.get(this.url + 'librosFavoritos-estadistica', { headers: this.getHeaders() });
    }

}
