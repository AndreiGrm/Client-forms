import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./presentation/login/login.component') },
    {
        path: 'homepage',
        loadComponent: () => import('./presentation/homepage/homepage.component'),
        children: [
            { path: 'clients', loadComponent: () => import('./presentation/clients/clients.component') },
            { path: 'client-form', loadComponent: () => import('./presentation/client-form/client-form') },
            { path: 'residence', loadComponent: () => import('./presentation/residence/residence.component') },
            { path: 'company', loadComponent: () => import('./presentation/company/company.component') },
        ]
    },
    // { path: 'client-form', loadComponent: () => import('./presentation/client-form/client-form') },
    { path: 'client', loadComponent: () => import('./presentation/client/client.component') },
    // { path: 'clients', loadComponent: () => import('./presentation/clients/clients.component') },
];
