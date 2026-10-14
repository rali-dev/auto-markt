import { isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  PLATFORM_ID,
  TransferState,
  inject,
  makeEnvironmentProviders,
  makeStateKey,
} from '@angular/core';
import { InMemoryCache, type NormalizedCacheObject } from '@apollo/client';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

// Dev-Adresse des NestJS-Backends. GraphQL haengt nicht am globalen Prefix
// /api (useGlobalPrefix ist aus). Konfigurierbar machen, sobald feststeht, wo
// Frontend und Backend in Produktion laufen.
const GRAPHQL_URL = 'http://localhost:3000/graphql';

/**
 * Apollos Cache wandert vom Server-Render in den Browser, sonst fragt der
 * Browser nach der Hydration jede Query ein zweites Mal ab. Angulars
 * HTTP-Transfer-Cache hilft hier nicht: Apollo Server antwortet mit
 * `Cache-Control: no-store`, und solche Antworten uebertraegt Angular bewusst
 * nicht.
 */
export const APOLLO_STATE = makeStateKey<NormalizedCacheObject>('apollo.state');

/**
 * Apollo-Client fuer die GraphQL-API. Erfordert provideHttpClient(): Apollo
 * sendet ueber Angulars HttpClient, nur so wartet SSR auf die Antworten und
 * greifen spaeter Interceptors (Auth).
 */
export function provideGraphQL(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideApollo(() => {
      const cache = new InMemoryCache();
      const transferState = inject(TransferState);

      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        cache.restore(transferState.get(APOLLO_STATE, {}));
      } else {
        // Laeuft erst beim Serialisieren, also nach allen Queries des Renders.
        transferState.onSerialize(APOLLO_STATE, () => cache.extract());
      }

      return {
        link: inject(HttpLink).create({ uri: GRAPHQL_URL }),
        cache,
      };
    }),
  ]);
}
