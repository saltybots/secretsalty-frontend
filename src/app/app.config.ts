import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({
    "projectId": "secret-salty",
    "appId": "1:588997035984:web:6d869ca95cf0c778615bd5",
    "storageBucket": "secret-salty.appspot.com",
    "apiKey": "AIzaSyATXINczUgrLHv2on0QlGWFEJWcKeRHUbI", // TODO Replace
    "authDomain": "secret-salty.firebaseapp.com",
    "messagingSenderId": "588997035984",
    "measurementId": "G-3KZWQGH1PV"
  }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideAnalytics(() => getAnalytics())), provideHttpClient(withFetch()), ScreenTrackingService, UserTrackingService,
    provideAnimations(),
    provideToastr({
      timeOut: 200000,
    }),
    provideRouter(routes),
  ]
};
