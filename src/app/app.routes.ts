import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./pages/blog/blog-page/blog-page.component').then(
        (m) => m.BlogPageComponent,
      ),
  },
  {
    path: 'archive/:id',
    loadComponent: () =>
      import('./pages/blog/blog-page-post/blog-page-post.component').then(
        (m) => m.BlogPagePostComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page/contact-page.component').then(
        (m) => m.ContactPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'index'
  }
];
