import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../../services/estadistica.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  standalone: true,
  providers: [EstadisticasService]
})
export class EstadisticasComponent implements OnInit {

  public totalUsuarios: number = 0;
  private chart: Chart | null = null;   // Se guarda la grafica, como para guardar una imagen 
  private chartLibros: Chart | null = null;

  constructor(
    private _estadisticasService: EstadisticasService
  ) { }

  ngOnInit(): void {
    this.obtenerEstadisticas();
    this.obtenerEstadisticasLibrosFavoritos();

  }

  //aqui vamos a obtener los datos del usuario a traves del service de estadistica
  obtenerEstadisticas() {
    this._estadisticasService.getEstadisticaUsuarios().subscribe(
      response => {
        //indicamos una respuesta de usuarios totales o si no ahi que aparesca un 0
        this.totalUsuarios = response.totalUsuarios || 0;
        this.crearGraficaPastel();   // cuando se obtiene los datos, se dibuja una gráfica
      },
      error => {
        console.error('Error al obtener estadísticas', error);
      }
    );
  }
  //metodo para usar el crearGraficaPastel(), creamos un canvas que tambien estara en el HTML
  //Dicho canvas tiene que tener una url para que el chart(libreria usada para crear graficas) sepa donde debe crear el grafico
  //por eso se usa el as HTMLCanvasElement y el (usuarioPie) debe ser el mismo en el html porque ese es el id que canvas va a usar
  private crearGraficaPastel() {
    var canvas = document.getElementById('usuarios') as HTMLCanvasElement | null;
    //decimos que si no existe canvas en el html aparece un error
    if (!canvas) {
      console.error('No se encontró el canvas con id usuarios');
      return;
    }

    // si ya había una gráfica, se destruyo para evitar errores
    if (this.chart) {
      this.chart.destroy();
    }
    // Se crea un nuevo chart con la info de totalUsarios que definimos como clase publica al principio, un color y ya
    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Usuarios registrados'],
        datasets: [
          {
            data: [this.totalUsuarios],
            backgroundColor: ['#fab05c'],
          }
        ]
      },
    });
  }

  //aqui vamos a obtener los datos del libro favorito
  obtenerEstadisticasLibrosFavoritos() {
    this._estadisticasService.getlibrosFavoritos().subscribe(
      response => {
        var datos = response.libroFavorito || [];

        // labels para obtener el tutulo de los libros y usamos map para que cambien el apartado como item.
        var titulo = datos.map((item: any) => item.titulo);
        var favorito = datos.map((item: any) => item.vecesFavorito);
        //obtenemos el id y las veces que se repite
        this.crearGraficaLibrosFavoritos(titulo, favorito);
      },
      error => {
        console.error('Error al obtener estadísticas de libros favoritos', error);
      }
    );
  }
  //Creamos la grafica
  private crearGraficaLibrosFavoritos(titulo: string[], favorito: number[]) {
    var canvas = document.getElementById('librosFavoritos') as HTMLCanvasElement | null;

    if (!canvas) {
      console.error('No se encontró el canvas con id librosFavoritos');
      return;
    }

    if (this.chartLibros) {
      this.chartLibros.destroy();
    }

    this.chartLibros = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: titulo,
        datasets: [
          {
            label: 'Veces marcado como favorito',
            data: favorito,
            // mismo color para todas las barras
            backgroundColor: ['#fab05c'],
          }
        ]
      },
    });
  }
}
