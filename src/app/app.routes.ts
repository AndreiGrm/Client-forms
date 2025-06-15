import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./presentation/client-form/client-form') },
];
