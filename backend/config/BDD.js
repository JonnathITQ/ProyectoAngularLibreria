//Para esto primero tenemos que instalar mongoose con npm install mongoose en la terminal

//1) Creamos constante para cargar los elementos de la libreria de mongoose
const mongoose = require('mongoose');

//2) Creamos otra constante para la ulr de conexión
const uri = 'mongodb+srv://adriel:adriel@cluster0.nh8ttsh.mongodb.net/EntreLetras?retryWrites=true&w=majority'

//3) Vamos a usar mongoose.connect() para conectarnos con nuestra base de datos 
mongoose.connect(uri)
.then(() => console.log("LA BASE DE DATOS SE PUDO CONECTAR DE MANERA EXITOSA")) //En caso que conecte con la base de datos, saldrá este mensaje
.catch(error => console.error("HUBO UN ERROR AL CONECTARSE CON LA BASE DE DATOS, EL ERROR ES : ", error)) //En caso que exista un error interno, saldrá este mensaje

module.exports = mongoose; //Exportamos mongoose para poder usarlo en otras partes de la aplicación

