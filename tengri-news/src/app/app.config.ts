import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), BrowserModule, CommonModule]
};
