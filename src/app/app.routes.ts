import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'form',
    loadComponent: () =>
      import('./form/form.component').then((m) => m.FormComponent),
  },
  {
    path: 'todos',
    loadChildren: () => import('./todos/todos.routes').then((m) => m.routes),
    // providers: [TodosService],
  },
  {
    path: '**',
    redirectTo: 'form',
  },
];
