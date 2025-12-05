import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { HistorialComponent } from "./historial/historial.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthGuardUser } from "../guards/usuarioAuth.guard";


export const UsuarioRoutes: Routes = [
    { path: '', component: InicioComponent, canActivate: [AuthGuardUser] },
    { path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuardUser] },
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuardUser] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardUser] },
    { path: 'sidebarU', component: SidebarComponent, canActivate: [AuthGuardUser] },
    { path: '**', component: InicioComponent, canActivate: [AuthGuardUser] }
]