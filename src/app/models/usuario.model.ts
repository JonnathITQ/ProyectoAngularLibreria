export class Usuarios {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public correo: string,
        public contrasenia: string,
        public descripcion: string,
        public imagen: string | null,
        public favoritos: string[] = []
    ) { }
}
