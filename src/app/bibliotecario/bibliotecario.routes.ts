import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { LibrosComponent } from "./libros/libros.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PrestamosComponent } from "./prestamos/prestamos.component";

export const BibliotecarioRoutes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'libros', component: LibrosComponent },
    { path: 'sidebar', component: SidebarComponent },
    { path: 'prestamos', component: PrestamosComponent },
    { path: "**", component: InicioComponent }
]