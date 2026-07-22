import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { BASE_URL } from '../../common/base-url.token';
import { OpenTodo } from '../../common/todo.model';

@Injectable()
export class OpenTodosService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  constructor() {
    console.log('OpenTodosService initialized');
    console.log('base url: ', this.baseUrl);
  }

  getTodos(): Observable<OpenTodo[]> {
    return this.httpClient.get<OpenTodo[]>(`${this.baseUrl}/open-todos.json`);
  }
}
