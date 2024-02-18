import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommercesReducer } from './store/reducers/commerce.reducers';
import { CommerceEffects } from './store/effects/commerce.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideStore(),
    provideHttpClient(),
    importProvidersFrom(StoreModule.forRoot({commerces: CommercesReducer})),
    importProvidersFrom(EffectsModule.forRoot([CommerceEffects])),
  ]
};