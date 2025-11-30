import { Routes } from "@angular/router";
import { PerfilComponent } from "./usercomponents/perfil/perfil.component";
import { FavoritoComponent } from "./usercomponents/favorito/favorito.component";
import { PrestamosComponent } from "./usercomponents/prestamos/prestamos.component";
import { UserComponent } from "./usercomponents/user/user.component";
import { BurguerComponent } from "./usercomponents/burguer/burguer.component";


export const UsuarioRoutes: Routes = [
    { path: '', component: UserComponent },
    { path: 'burguer', component: BurguerComponent},
    { path: 'perfil', component: PerfilComponent },
    { path: 'favorito', component: FavoritoComponent },
    { path: 'prestamos', component: PrestamosComponent },
    { path: "**", component: UserComponent}
]