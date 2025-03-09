import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
  provideApollo,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: environment.geoGraphQLUrl,
        }),
        cache: new InMemoryCache(),
      };
    }),
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        geoClient: {
          link: httpLink.create({
            uri: environment.geoGraphQLUrl,
            method: 'POST',
          }),
          cache: new InMemoryCache(),
        },
        netClient: {
          link: httpLink.create({
            uri: environment.graphQLUrl,
            method: 'POST',
          }),
          cache: new InMemoryCache(),
        },
      }),
      deps: [HttpLink],
    },
  ],
};
