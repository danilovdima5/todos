import { Component, computed, effect, inject, OnInit } from '@angular/core';

import { DatePipe, NgFor, NgIf } from '@angular/common';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { ClosedTodosService } from './closed-todos.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClosedTodosStore } from './closed-todos.store';
import { patchState } from '@ngrx/signals';
import { setEntities } from '@ngrx/signals/entities';

@Component({
  selector: 'app-closed-todos',
  imports: [DatePipe, YesNoPipe],
  providers: [
    {
      provide: ClosedTodosService,
      useClass: ClosedTodosService,
    },
    ClosedTodosStore,
  ],
  templateUrl: './closed-todos.component.html',
})
export class ClosedTodosComponent implements OnInit {
  // private readonly closedTodosService = inject(ClosedTodosService);
  private readonly closedTodosStore = inject(ClosedTodosStore);

  readonly todos = this.closedTodosStore.entities;

  readonly todosCount = this.closedTodosStore.numberOfTodos;

  // readonly todos = toSignal(this.closedTodosService.getTodos(), {
  //   initialValue: [],
  // });

  // readonly todosCount = computed(() => {
  //   return this.todos().length;
  // });

  constructor() {
    effect(() => {
      console.log(this.closedTodosStore.entities());
    });

    effect(() => {
      console.log(this.closedTodosStore.numberOfTodos());
    });

    // effect(() => {
    //   console.log('Closed todos updated:', this.todos());
    // });
  }

  ngOnInit(): void {
    setTimeout(() => {
      patchState(
        this.closedTodosStore,
        setEntities([
          {
            id: 1,
            todoName: 'Buy food',
            dateCompleted: '2026-06-30T16:30:00Z',
          },
          {
            id: 2,
            todoName: 'Get a dog',
            dateCompleted: '2026-06-30T16:30:00Z',
          },
          {
            id: 3,
            todoName: 'Build a house',
            dateCompleted: '2026-06-30T16:30:00Z',
          },
        ]),
      );

      this.closedTodosStore.setTodos([
        {
          id: 1,
          todoName: 'Buy food',
          dateCompleted: '2026-06-30T16:30:00Z',
        },
        {
          id: 2,
          todoName: 'Get a dog',
          dateCompleted: '2026-06-30T16:30:00Z',
        },
        {
          id: 3,
          todoName: 'Build a house',
          dateCompleted: '2026-06-30T16:30:00Z',
        },
      ]);
    }, 1000);
  }
}
