import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './todos.component.scss',
  template: `
    <ul>
      <li>
        <a routerLink="open" routerLinkActive="active">Open Todos</a>
      </li>
      <li>
        <a routerLink="closed" routerLinkActive="active">Closed Todos</a>
      </li>
    </ul>

    <router-outlet />
  `,
})
export class TodosComponent {}
