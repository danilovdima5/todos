import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BASE_URL } from './common/base-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // {
    //   provide: TodosService,
    //   useExisting: HttpClient,
    // },
    {
      provide: BASE_URL,
      useValue: '',
    },
  ],
};
