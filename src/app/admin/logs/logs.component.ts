import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, ɵnormalizeQueryParams } from '@angular/common';
import { LogsService } from '../../services/logs.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, DatePipe, SidebarComponent, FormsModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
  providers:[LogsService],
})
export class LogsComponent implements OnInit {

  // Si tienes interfaz Log, úsala en vez de any[]
  public listaLogs: any[] = [];
  public loading: boolean = false;
  public errorMessage: string | null = null;

  constructor(
    private _logsService: LogsService,
  ) {}

  ngOnInit(): void {
          this.cargarLogs();
  }

  cargarLogs(): void {
    this.loading = true;
    this.errorMessage = null;

    this._logsService.verLogs().subscribe({
      next: (response: any) => {
        console.log('Respuesta logs =>', response);
        this.listaLogs = response.logs || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'No se pudieron cargar los logs';
        this.loading = false;
      }
    });
  }

  getActorNombre(log: any): string {
    const actor: any = log.actor_id;
    if (actor && typeof actor === 'object') {
      const nombre = actor.nombre || '';
      const apellido = actor.apellido || '';
      const texto = `${nombre} ${apellido}`.trim();
      return texto || '(Sin nombre)';
    }
    return '(Sin datos del actor)';
  }

  getActorRol(log: any): string {
    const actor: any = log.actor_id;
    return actor?.rol || '(sin rol)';
  }
}