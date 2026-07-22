import {
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ClosedTodo } from '../../common/todo.model';
import { computed, inject } from '@angular/core';
import { ClosedTodosService } from './closed-todos.service';
import { ActivatedRoute, Params } from '@angular/router';
import {
  removeEntity,
  setAllEntities,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

// type ClosedTodosState = {
//   closedTodos: ClosedTodo[];
// };

// const initialState: ClosedTodosState = {
//   closedTodos: [],
// };

function withQueryParams() {
  return signalStoreFeature(
    withState<{ params: Params }>({
      params: {},
    }),
    withHooks((store) => {
      const activatedRoute = inject(ActivatedRoute);

      return {
        onInit() {
          activatedRoute.queryParams
            .pipe(takeUntilDestroyed())
            .subscribe((params) => {
              patchState(store, { params });
            });
        },
      };
    }),
  );
}

const initialState = {
  isLoading: false,
};

export const ClosedTodosStore = signalStore(
  {
    providedIn: 'root',
    protectedState: false,
  },
  withState(initialState),
  withEntities<ClosedTodo>(),
  withComputed((store) => ({
    numberOfTodos: computed(() => store.entities().length),
  })),
  withProps(() => ({
    _closedTodosService: inject(ClosedTodosService),
  })),
  withMethods((store) => ({
    setTodos(todos: ClosedTodo[]): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, setEntities(todos));
    },
    removeTodo(id: number): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, removeEntity(id));
    },
    loadTodos: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return store._closedTodosService.getTodos().pipe(
            tap({
              next: (todos) =>
                patchState(store, setAllEntities(todos), { isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
  })),
  // withHooks({
  //   onInit(store) {
  //     watchState(store, (state) => {
  //       console.log('[watchState] counter state', state.closedTodos);
  //     }); // logs: { count: 0 }, { count: 1 }, { count: 2 }

  //     effect(() => {
  //       console.log('[effect] counter state', getState(store).closedTodos);
  //     }); // logs: { count: 2 }
  //   },
  // }),
  // withHooks({
  //   onInit(store) {
  //     watchState(store, (state) => {
  //       console.log('[watchState] counter state', state.closedTodos);
  //     }); // logs: { count: 0 }, { count: 1 }, { count: 2 }

  //     effect(() => {
  //       console.log('[effect] counter state', getState(store).closedTodos);
  //     }); // logs: { count: 2 }
  //   },
  // }),
  withQueryParams(),
);
