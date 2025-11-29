import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index',
    loadComponent: () =>
      import('./pages/home-page.component/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page.component/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./pages/blog/blog-page.component/blog-page.component').then(
        (m) => m.BlogPageComponent,
      ),
  },
  {
    path: 'archive/:id',
    loadComponent: () =>
      import('./pages/blog/blog-page-post.component/blog-page-post.component').then(
        (m) => m.BlogPagePostComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page.component/contact-page.component').then(
        (m) => m.ContactPageComponent,
      ),
  },
];
