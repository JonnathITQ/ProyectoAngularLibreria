export class Ticket {
    constructor(
        public _id: string,
        public nombre: string,
        public email: string,
        public asunto: string,
        public mensaje: string,
        public estado: boolean,
        public fecha: Date,
        public image: string
    ) { }
}
