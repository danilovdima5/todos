import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BASE_URL } from '../../common/base-url.token';
import { BaseTodo } from '../../common/todo.model';

@Injectable()
export class TodosService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  constructor() {
    console.log('TodosService initialized');
    console.log('base url: ', this.baseUrl);
  }

  getTodos(): Observable<BaseTodo[]> {
    return this.httpClient.get<BaseTodo[]>(`${this.baseUrl}/closed-todos.json`);

    // return req1.pipe(
    //   switchMap((todos1) => {
    //     return req2.pipe(
    //       map((todos2) => {
    //         return [...todos1, ...todos2];
    //       }),
    //     );
    //   }),
    // );
  }
}
