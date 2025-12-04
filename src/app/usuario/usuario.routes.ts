import { Routes } from "@angular/router";
import { PerfilComponent } from "./usercomponents/perfil/perfil.component";
import { PrestamosComponent } from "./usercomponents/prestamos/prestamos.component";
import { UserComponent } from "./usercomponents/user/user.component";
import { BurguerComponent } from "./usercomponents/burguer/burguer.component";
import { DetalleLibroComponent } from "../pages/libros/detalle-libro/detalle-libro.component";
import { FavoritosComponent } from "./usercomponents/favoritos/favoritos.component";

export const UsuarioRoutes: Routes = [
    { path: '', component: UserComponent },
    { path: 'burguer', component: BurguerComponent},
    { path: 'perfil', component: PerfilComponent },
    { path: 'prestamos', component: PrestamosComponent },
    { path: "libros/:id", component: DetalleLibroComponent},
    { path: "favoritos", component: FavoritosComponent},
    { path: "**", component: UserComponent}
]
