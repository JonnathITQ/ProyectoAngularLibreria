import { Injectable } from "@angular/core";
import { urlMongo } from "./urlMongo";

@Injectable()

export class CargarService {
    public url: string;

    constructor() {
        this.url = urlMongo.url;
    }

    /*
    1) Método para hacer una petición ajax para poder adjuntar un archivo.
       Pasamos de la url, los posibles params, en este caso el array de tipo string
       un array de archivos y el nombre del archivo de tipo string
    */

    peticionRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        /*
        Esto devolverá una promesa que tiene un resolve: Cuando se ha resuelto y reject: cuando no está resuelto
        */

        return new Promise(function (resolve, reject) {
            var formData: any = new FormData(); // Simulación de formulario en un objeto
            var xhr = new XMLHttpRequest(); //xhr es sinónimo de ajax que contiene un objeto de petición asíncrona de JS

            //Con el for voy a recorrer todos los ficheros que lleguen y adjuntar al formulario con el nombre que llega
            //es decir, añade ese archivo con su nombre
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            //Cuando suceda algún cambio
            xhr.onreadystatechange = function () {
                //Valores que funcionan según el AJAX
                if (xhr.readyState == 4) { //Valores que funcionan así
                    if (xhr.status == 200) { //Si es éxitoso, se ejecuta la resolución de la promesa
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response); //Caso contrario, lo rechaza
                    }
                }
            }
            //Realizamos la petición de ajax por método post y true para que se haga la petición
            xhr.open('POST', url, true);
            //Envio al formulario o los datos
            xhr.send(formData);
        });
    }
}