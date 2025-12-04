import { Routes } from "@angular/router";
import { PerfilComponent } from "./usercomponents/perfil/perfil.component";
import { PrestamosComponent } from "./usercomponents/prestamos/prestamos.component";
import { UserComponent } from "./usercomponents/user/user.component";
import { BurguerComponent } from "./usercomponents/burguer/burguer.component";
import { DetalleLibroComponent } from "../pages/libros/detalle-libro/detalle-libro.component";
import { FavoritosComponent } from "./usercomponents/favoritos/favoritos.component";
import { AuthGuard } from "../guards/auth.guard";

export const UsuarioRoutes: Routes = [
    { path: '', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'burguer', component: BurguerComponent, canActivate: [AuthGuard]},
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard] },
    { path: "libros/:id", component: DetalleLibroComponent, canActivate: [AuthGuard]},
    { path: "favoritos", component: FavoritosComponent, canActivate: [AuthGuard]},
    { path: "**", component: UserComponent, canActivate: [AuthGuard]}
]
