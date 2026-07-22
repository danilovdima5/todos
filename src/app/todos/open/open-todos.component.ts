import { Component, computed, effect, inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { OpenTodosService } from './open-todos.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-open-todos',
  imports: [YesNoPipe],
  providers: [
    {
      provide: OpenTodosService,
      useClass: OpenTodosService,
    },
  ],
  templateUrl: './open-todos.component.html',
})
export class OpenTodosComponent {
  private readonly openTodosService = inject(OpenTodosService);

  readonly todos = toSignal(this.openTodosService.getTodos(), {
    initialValue: [],
  });

  readonly todosCount = computed(() => {
    return this.todos().length;
  });

  constructor() {
    effect(() => {
      console.log('Todos updated:', this.todos());
    });
  }
}
