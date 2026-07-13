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
          import('./open/todos.component').then((m) => m.TodosComponent),
      },
      {
        path: 'closed',
        loadComponent: () =>
          import('./closed/todos.component').then((m) => m.TodosComponent),
      },
      {
        path: '**',
        redirectTo: 'open',
      },
    ],
  },
];
