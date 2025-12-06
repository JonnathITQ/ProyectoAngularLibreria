export class Log {
    constructor(
        public _id: string,
        public actor_id: any,
        public actor_tipo: string,
        public accion: string,
        public recurso: string,
        public recurso_id: string,
        public descripcion: string,
        public fecha: string
    ) { }
}