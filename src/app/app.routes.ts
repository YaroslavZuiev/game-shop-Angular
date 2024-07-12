import { Routes } from '@angular/router';

import {routeGuard} from "./guards/route.guard";

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./components/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./components/sign-up/sign-up.component').then(c => c.SignUpComponent)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [routeGuard],
  },
  { path: '**', redirectTo: 'dashboard/posts', pathMatch: 'full' }
];
