import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'; // Add MatButtonModule for buttons

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(),MatDialogModule,MatButtonModule]
};
