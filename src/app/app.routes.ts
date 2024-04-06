import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'exceptions',
    loadComponent: () =>
      import('./pages/exceptions/exceptions.component').then(
        (m) => m.ExceptionsComponent
      ),
  },
  {
    path: 'predictions',
    loadComponent: () =>
      import('./pages/predictions/predictions.component').then(
        (m) => m.PredictionsComponent
      ),
  },
  {
    path: 'saved-searches',
    loadComponent: () =>
      import('./pages/saved-searches/saved-searches.component').then(
        (m) => m.SavedSearchesComponent
      ),
  },
  {
    path: 'requests',
    loadComponent: () =>
      import('./pages/requests/requests.component').then(
        (m) => m.RequestsComponent
      ),
  },
  {
    path: 'time',
    loadComponent: () =>
      import('./pages/time/time.component').then((m) => m.TimeComponent),
  },
  {
    path: 'log-details',
    loadComponent: () =>
      import('./pages/log-details/log-details.component').then(
        (m) => m.LogDetailsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
