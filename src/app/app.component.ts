import { Component, inject } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { TasksService } from './tasks.service';
import { filter, map, startWith } from 'rxjs';
import { NewTaskValue } from './form/form.models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ListComponent, FormComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly tasksService = inject(TasksService);

  tasks$ = this.tasksService.getTasks();

  constructor() {
    this.tasksService
      .getTasks()
      .pipe
      // map((response) => {
      //   return response.map((todo, index) => {
      //     return {
      //       ...todo,
      //       index,
      //     };
      //   });
      // }),
      // map((todos) => {
      //   return todos.map((todo) => {
      //     return {
      //       ...todo,
      //       index: todo.index.toString(),
      //     };
      //   });
      // }),
      // filter((todos) => {
      //   return todos.length > 0;
      // }),
      ();
    // .subscribe((allTasks) => {
    //   this.tasks = allTasks;
    // });
  }
}
