import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { LibrosComponent } from "./libros/libros.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { PrestamosComponent } from "./prestamos/prestamos.component";
import { AuthGuard } from "../guards/auth.guard";


export const BibliotecarioRoutes: Routes = [
    { path: '', component: InicioComponent, canActivate: [AuthGuard] },
    { path: 'libros', component: LibrosComponent, canActivate: [AuthGuard] },
    { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard] },
    { path: "**", component: InicioComponent, canActivate: [AuthGuard] }
]