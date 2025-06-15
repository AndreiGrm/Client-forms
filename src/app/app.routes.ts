import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./presentation/client-form/client-form') },
    { path: 'residence', loadComponent: () => import('./presentation/residence/residence.component') },
    { path: 'company', loadComponent: () => import('./presentation/company/company.component') },
];
