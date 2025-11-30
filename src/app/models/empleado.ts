export class Empleado {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public cedula: number,
        public tipoSangre: string,
        public seguroMedico: string,
        public correo: string,
        public contrasenia: string,
        public rol: string,
        public imagen: string
    ) { }
}
