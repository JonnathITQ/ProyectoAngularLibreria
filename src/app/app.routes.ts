import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContactoComponent } from './pages/contacto/contacto.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './sesiones/login/login.component';
import { LoginUsuarioComponent } from './sesiones/login-usuario/login-usuario.component';
import { RegistrarComponent } from './sesiones/registrar/registrar.component';
import { RecuperarComponent } from './sesiones/recuperar/recuperar.component';
import { IndependienteComponent } from './pages/independiente/independiente.component';
import { SesionComponent } from './modales/sesion/sesion.component';
import { HomeComponent } from './pages/home/home.component';
import { SeleccionLoginComponent } from './sesiones/seleccion-login/seleccion-login.component';

export const routes: Routes = [
    { path: "navbar", component: NavbarComponent }, //Navbar
    { path: "", component: HomeComponent }, //Página de Inicio
    { path: "contacto", component: ContactoComponent }, //Página Contacto
    { path: "libros", component: LibrosComponent }, //Página donde se ubican todos los libros
    { path: "sidebar", component: SidebarComponent }, //Sidebar
    { path: "login", component: LoginComponent }, //Página para el Login de Empleado
    { path: "login-usuario", component: LoginUsuarioComponent }, //Página para el Login de Usuario
    { path: "registrar", component: RegistrarComponent }, //Página para el registro del usuario
    { path: "recuperar", component: RecuperarComponent }, //Página para recuperar la contraseña de usuario o bibliotecario
    { path: "independiente", component: IndependienteComponent }, //Página de Libros específicos
    { path: "footer", component: FooterComponent }, //Footer
    { path: "modales", component: SesionComponent }, //Modal para inicio de sesión en caso que toque los libros
    {
        path: "bibliotecario", loadChildren: //Rutas para el bibliotecario
            () => import('./bibliotecario/bibliotecario.routes')
                .then(m => m.BibliotecarioRoutes)
    },
    { path: "seleccionar", component: SeleccionLoginComponent },
    { path: "**", component: HomeComponent }, //Validación al error de rutas, manda al inicio
];
