// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { LogsComponent } from './logs/logs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdminGuard } from '../guards/admin.guard';
import { EmpleadosComponent } from './empleados/empleados.component';

export const ADMIN_ROUTES: Routes = [
        { path: '', component: InicioComponent, canActivate: [AdminGuard] },
       { path: 'sidebar', component: SidebarComponent, canActivate:  [AdminGuard]},
       { path: 'logs', component: LogsComponent, canActivate:  [AdminGuard]},
       { path: 'Estadistica', component: EstadisticasComponent, canActivate: [AdminGuard]},
       { path: 'lista-admin', component: AdministradoresComponent, canActivate: [AdminGuard]},
       { path: 'empleados', component: EmpleadosComponent, canActivate: [AdminGuard]},
       { path: "**", component: InicioComponent, canActivate: [AdminGuard] }
];