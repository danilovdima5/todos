import { inject, Injectable } from '@angular/core';
import { NewTaskValue } from './form/form.models';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly httpClient = inject(HttpClient);

  tasks: NewTaskValue[] = [];

  getTasks(): Observable<NewTaskValue[]> {
    const req1 = this.httpClient.get<NewTaskValue[]>('todos-1.json');

    const req2 = this.httpClient.get<NewTaskValue[]>('todos-2.json');

    return req1.pipe(
      switchMap((todos1) => {
        return req2.pipe(
          map((todos2) => {
            return [...todos1, ...todos2];
          }),
        );
      }),
    );
  }

  addTask(task: NewTaskValue) {
    this.tasks = [...this.tasks, task];
  }

  removeTask(task: NewTaskValue) {
    this.tasks = this.tasks.filter((t) => t.taskName !== task.taskName);
  }
}
