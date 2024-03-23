import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'exceptions',
    loadChildren: () =>
      import('./pages/exceptions/exceptions.module').then(
        (m) => m.ExceptionsModule
      ),
  },
  {
    path: 'predictions',
    loadChildren: () =>
      import('./pages/predictions/predictions.module').then(
        (m) => m.PredictionsModule
      ),
  },
  {
    path: 'saved-searches',
    loadChildren: () =>
      import('./pages/saved-searches/saved-searches.module').then(
        (m) => m.SavedSearchesModule
      ),
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./pages/requests/requests.module').then((m) => m.RequestsModule),
  },
  {
    path: 'time',
    loadChildren: () =>
      import('./pages/time/time.module').then((m) => m.TimeModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
