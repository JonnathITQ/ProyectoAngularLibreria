export class Libros { 
    constructor(
        public _id: String,
        public titulo: String,
        public descripcion: String,
        public genero: String,
        public portada: String,
        public anio_publicacion: Number,
        public idioma: String,
        public cantidad_disponible: Number,
        public autor: String,
        public ubicacion: String
    ) { 
        
        
    }
}