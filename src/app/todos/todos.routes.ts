import { Routes } from '@angular/router';
import { TodosComponent } from './todos.component';

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [
      {
        path: 'open',
        loadComponent: () =>
          import('./open/open-todos.component').then(
            (m) => m.OpenTodosComponent,
          ),
      },
      {
        path: 'closed',
        loadComponent: () =>
          import('./closed/closed-todos.component').then(
            (m) => m.ClosedTodosComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'open',
      },
    ],
  },
];
