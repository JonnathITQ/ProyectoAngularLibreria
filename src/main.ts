import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Registra el servicio HttpClient, pero usando la API fetch del navegador
    // en lugar de la implementación clásica basada en XMLHttpRequest.
    // Esto permite usar HttpClient normalmente, pero con fetch por debajo.
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
