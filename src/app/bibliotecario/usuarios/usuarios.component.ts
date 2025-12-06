import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [UsuarioService, LogsService, EmpleadoService]
})
export class UsuariosComponent implements OnInit {

  public listaUsuarios: Usuarios[] = []; //Guardo en un vector  la lista de usuarios cargados en la bdd
  public usuario: Usuarios; //guardo el usuario activo, me servirá para crear y editar
  public status: string = ""; //Esto servirá para mostrar los estados
  public usuarioOriginal: Usuarios | null = null; //Esto es para comparar si hicieron algún cambio
  public idUsuarioAEliminar: String | null = null; //Puse esto para guardar el ID y eliminarlo temporalmente

  constructor(
    private usuarioService: UsuarioService, //Esto accedera a los métodos del CRUD que hice en el usuario.service.ts
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    //Iniciamos con datos vacíos y como todo es un string, se quedará ''
    this.usuario = new Usuarios('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.obtenerUsuarios(); //Apenas inicie el componente, cargará los usuarios
  }

  // Obtener info del empleado logueado, a traves del loclahost del servicio empleado (actor para los logs)
  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  obtenerUsuarios() {
    this.usuarioService.verUsuarios().subscribe(response => {
      this.listaUsuarios = response.usuario; //Guardamos las respuestas del backend gracias a esto
      console.log('Usuarios Cargados:', this.listaUsuarios);
    },
      error => {
        console.log('Error al cargar usuarios', error);
      }
    );
  }

  registrarUsuario(form: any) {
    this.usuarioService.guardarUsuarios(this.usuario).subscribe(
      response => {
        if (response.usuario) { //Haremos un if para validar si la respuesta fue éxitosa y la incorrecta
          this.status = 'success';
          this.obtenerUsuarios(); //Recarga la lista de usuarios
          this.resetForm(form); //Esto limpia el formulario una vez escrito y guardado o editado
          this.cerrarModal(); //Con esto cerraremos el modal de registro
        } else {
          this.status = 'failed'; //Alejar al Maiccol 4 metros del proyecto para que funcione bien
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  actualizarUsuario() {

    //Escribí una validación. Para actualizar, se debería cambiar algo, esto detecta que si no se cambia nada, saldrá un error que diga
    //'Debes cambiar algo para poder editar o guardar'
    if (JSON.stringify(this.usuario) === JSON.stringify(this.usuarioOriginal)) {
      console.error("Debes modificar algo para guardar");
      return;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (response.usuario) { //Si la validación es exitosa, obtendré los usuarios, se limpiará el form, se reemplaza por el original
          this.status = 'success';
          this.obtenerUsuarios();
          this.usuario = new Usuarios('', '', '', '', '', '', '');
          this.usuarioOriginal = null;
          this.cerrarModal(); // se cierra el modal
        } else {
          this.status = 'failed'; // ya nada, no vale
        }
      },
      error => {
        console.log(error);
        this.status = 'failed'; //si tiene algún error en la lógica, se podrá ver en la consola
      }
    );
  }

  prepararEliminacion(id: String) {
    this.idUsuarioAEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idUsuarioAEliminar) {
      this.usuarioService.deleteUsuario(this.idUsuarioAEliminar).subscribe(
        response => {
          this.obtenerUsuarios();
          this.idUsuarioAEliminar = null;
          this.cerrarModalEliminar();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  seleccionarUsuario(usuario: Usuarios) {
    this.usuario = { ...usuario }; // Creamos una copia
    this.usuarioOriginal = { ...usuario }; // guardamos el original
  }

  resetForm(form?: any) { //Reseteamos el formulario cuando se envie
    if (form) {
      form.reset();
    }
    this.usuario = new Usuarios('', '', '', '', '', '', '');
    this.usuarioOriginal = null;
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

  private logsCrearUsuarios(usuariosCreados: Usuarios): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'CREAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuariosCreados._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) registró al usuario "${usuariosCreados?.nombre} ${usuariosCreados?.apellido}" con cédula ${usuariosCreados?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de creación de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }

  private logsActualizarUsuarios(usuariosActualizados: Usuarios): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuariosActualizados._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) actualizó los datos del usuario "${usuariosActualizados?.nombre} ${usuariosActualizados?.apellido}" con cédula ${usuariosActualizados?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de actualización de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }

  private logsEliminarUsuarios(usuarioEliminado: Usuarios | undefined): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'ELIMINAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuarioEliminado?._id,
      descripcion: usuarioEliminado
        ? `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó al usuario "${usuarioEliminado?.nombre} ${usuarioEliminado?.apellido}" con cédula ${usuarioEliminado?.cedula}.`
        : `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó un usuario.`
    }).subscribe({
      next: () => console.log('Log de eliminación de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }
}
