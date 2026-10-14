import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  // Startseite: bisher nur das Layout (Header, leeres main, Footer). Der
  // Eintrag ist trotzdem noetig: Der SSR-Server kennt nur Pfade aus dieser
  // Liste und antwortet sonst auf / mit 404.
  { path: '',
    pathMatch: 'full',
    title: 'Home | Auto Markt',
    loadComponent: () => import('./home/home').then((m) => m.Home) },
  {
    path: 'products',
    title: 'Products | Auto Markt',
    loadComponent: () => import('./products/products').then((m) => m.Products),
  },
];
