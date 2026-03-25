import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@libs/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
