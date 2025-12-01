export class Prestamos {
    constructor(
        public _id: String,
        public usuario_id: any,
        public libros_id: any,
        public descripcion: String,
        public horasPrestamo: Number,
        public multa: Boolean
    ) { }
}