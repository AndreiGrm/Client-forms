import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/login/login.component') },
  { path: 'register', loadComponent: () => import('./presentation/register/register.component') },
  {
    path: 'homepage',
    loadComponent: () => import('./presentation/homepage/homepage.component'),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',   loadComponent: () => import('./presentation/dashboard/dashboard.component') },
      { path: 'clients',     loadComponent: () => import('./presentation/clients/clients.component') },
      { path: 'client-form', loadComponent: () => import('./presentation/client-form/client-form') },
      { path: 'residence',   loadComponent: () => import('./presentation/residence/residence.component') },
      { path: 'company',     loadComponent: () => import('./presentation/company/company.component') },
      { path: 'client',      loadComponent: () => import('./presentation/client/client.component') },
    ]
  }
];
