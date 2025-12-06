import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
  providers:[EmpleadosService, LogsService],
  standalone:true
})
export class EmpleadosComponent implements OnInit {

  public listaEmpleados: Empleado[] = []; //Guardo en un vector  la lista de empleados cargados en la bdd
    public empleado: Empleado; //guardo el empleado activo, me servirá para crear y editar
    public status: string = ""; //Esto servirá para mostrar los estados
    public empleadoOriginal: Empleado | null = null; //Esto es para comparar si hicieron algún cambio
    public idEmpleadoEliminar: String | null = null; //Puse esto para guardar el ID y eliminarlo temporalmente
  
    constructor(
      private empleadoService: EmpleadosService, //Esto accedera a los métodos del CRUD que hice en el empleados.service.ts
      private _logService:LogsService, //Para crear los losg tambien se conectara al service de logs
      private empleadosService:EmpleadoService // Esto para acceder a el servicio de tokens de empleado
    ) {
      //Iniciamos con datos vacíos y como todo es un string, se quedará ''
      this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
    }
  
    ngOnInit(): void {
      this.obtenerEmpleados();
    }

    private getActor(){
    return this.empleadosService.getEmpleado();
  }

    obtenerEmpleados() {
    this.empleadoService.verEmpleados().subscribe(
      response => {
        const empleados = response.empleado || response.empleados || [];
      //Nos quedamos SOLO con los que NO son admin
      //para mostrar
      this.listaEmpleados = empleados.filter((e: any) => e.rol !== 'admin');
        console.log('Empleados Cargados:', this.listaEmpleados);
      },
      error => {
        console.log('Error al cargar empleados', error);
      }
    );
  }

  registrarEmpleado(form: any) {
    this.empleado.rol=('bibliotecario')
    this.empleadoService.guardarEmpleados(this.empleado).subscribe(
      response => {
        if (response.empleado) { // Haremos un if para validar si la respuesta fue exitosa
          this.status = 'success';
          this.obtenerEmpleados();   // Recarga la lista de empleados
          this.resetForm(form);      // Esto limpia el formulario
          this.cerrarModal();        // Con esto cerraremos el modal de registro
          this.logsCrearEmpleado(response.empleado);
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  actualizarEmpleado() {
    // Escribí una validación. Para actualizar, se debería cambiar algo,
    // esto detecta que si no se cambia nada, saldrá un error
    if (JSON.stringify(this.empleado) === JSON.stringify(this.empleadoOriginal)) {
      console.error("Debes modificar algo para guardar");
      return;
    }

    this.empleadoService.actualizarEmpleados(this.empleado).subscribe(
      response => {
        if (response.empleado) { // Si la validación es exitosa...
          this.status = 'success';
          this.obtenerEmpleados();
          this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
          this.empleadoOriginal = null;
          this.cerrarModal(); // se cierra el modal
          this.logsActualizarEmpleado(response.empleado);

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  prepararEliminacion(id: String) {
    this.idEmpleadoEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idEmpleadoEliminar) {
      this.empleadoService.deleteEmpleados(this.idEmpleadoEliminar).subscribe(
        response => {
          this.obtenerEmpleados();
          this.idEmpleadoEliminar = null;
          this.cerrarModalEliminar();
          this.logsEliminarEmpleado(response.empleado);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  seleccionarEmpleado(empleado: Empleado) {
    this.empleado = { ...empleado };         // Creamos una copia
    this.empleadoOriginal = { ...empleado }; // Guardamos el original
  }

  resetForm(form?: any) { // Reseteamos el formulario cuando se envíe
    if (form) {
      form.reset();
    }
    this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
    this.empleadoOriginal = null;
  }

  cerrarModal() {
    const btnCerrar = document.getElementById('closeModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  cerrarModalEliminar() {
    const btnCerrar = document.getElementById('closeDeleteModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  
  //Estos son los logs que tiene nombres que se van a usar en los apartados de arriba, en el crear, actualizar y elminar.
  private logsCrearEmpleado(empleadoCreado: Empleado): void{
    //este acto es para obtener el dato de la persona que hizo el cambio o la accion
      var actor= this.getActor();
      //llamamos al servico de logs y creamos un nuevo log, con los datos de tipo, accion, recurso, etc
      this._logService.crearLogs({
              actor_id: actor?._id,
              actor_tipo: 'Empleados',
              accion: 'CREAR_EMPLEADO',
              recurso: 'empleado',
              recurso_id: empleadoCreado._id, //Un aparto que indicara el actor que realizo la accion con su rol al cambio que realizo, en este caso a un empleado
              //? condicional para devolver vacio si el acto no existe, era mas para que no existan errores pero funciona, esto es un
              //template:Cadena de texto con contenido dinamico, 
              descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) registró al empleado "${empleadoCreado?.nombre} ${empleadoCreado?.apellido}" con cédula ${empleadoCreado?.cedula}.`
            }).subscribe({
              next: () => console.log('Log de creación de empleado registrado'),
              error: (err) => console.error('Error al registrar log de empleado', err)
            });
    }
    //los logs son muy parecidos en todos los lugares, lo unico que cambia es el mensaje y el empleadoActualizado para que cuadre con el nuevo log
    private logsActualizarEmpleado(empleadoActualizado:Empleado):void{
            var actor = this.getActor();
            this._logService.crearLogs({
              actor_id: actor?._id,
              actor_tipo: 'Empleados',
              accion: 'EDITAR_EMPLEADO',
              recurso: 'empleado',
              recurso_id: empleadoActualizado._id,
              descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) actualizó los datos del empleado "${empleadoActualizado?.nombre} ${empleadoActualizado?.apellido}" con cédula ${empleadoActualizado?.cedula}.`
            }).subscribe({
              next: () => console.log('Log de actualización de empleado registrado'),
              error: (err) => console.error('Error al registrar log de empleado', err)
            });
    }
  
    private logsEliminarEmpleado(empleadoElminado:Empleado|undefined):void{
      var actor=this.getActor();
      this._logService.crearLogs({
        actor_id: actor?._id,
              actor_tipo: 'Empleados',
              accion: 'ELIMINAR_EMPLEADO',
              recurso: 'empleado',
              recurso_id: empleadoElminado?._id,
              descripcion: empleadoElminado
              //el eliminar es el unico que tiene 2 sentencias para 2 situaciones, pero podriamos borrar la segunda
              // si al borrar un empleado se obtiene los datos de ese empleado se usara el primer caso
              //pero si no se obtiene los datos se usara el segundo, es una cuestion de seguridad para que no explote la pagina
                ? `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó al empleado "${empleadoElminado?.nombre} ${empleadoElminado?.apellido}" con cédula ${empleadoElminado?.cedula}.`
                : `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó un empleado.`
            }).subscribe({
              next: () => console.log('Log de eliminación de empleado registrado'),
              error: (err) => console.error('Error al registrar log de empleado', err)
            });
    }
}
