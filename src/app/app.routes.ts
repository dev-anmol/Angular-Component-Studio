import {Routes} from '@angular/router';
import {AppShell} from '../layout/app-shell/app-shell';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('../pages/landing-page/landing-page').then(m => m.LandingPage),
}, {
  path: '',
  component: AppShell,
  children: [
    {
      path: 'docs',
      children: [
        {
          // This route contains the introduction regarding the application i.e the problems, solutions and features
          path: '',
          loadComponent: () => import('../pages/introduction/introduction')
            .then(m => m.Introduction)
        }, {
          // This path contains all the components and users can navigate to individual components by selecting
          path: 'components',
          loadComponent: () => import('../pages/components/component-page/component-page')
            .then(m => m.ComponentPage)
        },
        {
          // This path contains the details regarding the individual component.
          path: 'components/:slug',
          loadComponent: () =>
            import('../pages/components/component-detail/component-detail').then(m => m.ComponentDetail),
        }
      ]
    },
  ]
}];

