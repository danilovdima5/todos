import { Component, computed, effect, inject } from '@angular/core';

import { DatePipe, NgFor, NgIf } from '@angular/common';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { TodosService } from './todos.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todos',
  imports: [DatePipe, YesNoPipe],
  providers: [
    {
      provide: TodosService,
      useClass: TodosService,
    },
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  private readonly todosService = inject(TodosService);

  readonly todos = toSignal(this.todosService.getTodos(), {
    initialValue: [],
  });

  readonly tasksCount = computed(() => {
    return this.todos().length;
  });

  constructor() {
    effect(() => {
      console.log('Todos updated:', this.todos());
    });
  }
}
