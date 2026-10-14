import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Live-Daten aus der API: bei jedem Request auf dem Server rendern. Als
    // Prerender stuende der Stand vom Build im HTML und im Transfer-Cache (der
    // Browser wuerde ihn nicht neu laden), und der Build braeuchte ein
    // laufendes Backend.
    path: 'products',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
