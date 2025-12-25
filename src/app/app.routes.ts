import {Routes} from '@angular/router';
import {AppShell} from '../layout/app-shell/app-shell';

export const routes: Routes = [

  // Landing page (NO shell)
  {
    path: '',
    loadComponent: () =>
      import('../pages/landing-page/landing-page')
        .then(m => m.LandingPage),
  },

  // Docs area (WITH shell)
  {
    path: 'docs',
    component: AppShell,
    children: [

      // Introduction
      {
        path: '',
        loadComponent: () =>
          import('../pages/introduction/introduction')
            .then(m => m.Introduction),
      },

      // Components overview
      {
        path: 'components',
        loadComponent: () =>
          import('../pages/components/component-page/component-page')
            .then(m => m.ComponentPage),
      },

      // Component detail
      {
        path: 'components/:slug',
        loadComponent: () =>
          import('../pages/components/component-detail/component-detail')
            .then(m => m.ComponentDetail),
      },
    ],
  },
];
