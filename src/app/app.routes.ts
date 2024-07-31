import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'posts',
        loadComponent: () => import('./pages/posts/posts.component').then(c => c.PostsComponent)
    },
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
    }
];
