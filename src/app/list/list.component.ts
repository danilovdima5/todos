import { Component, input, output } from '@angular/core';
import { NewTaskValue } from '../form/form.models';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { YesNoPipe } from '../pipes/yes-no.pipe';

@Component({
  selector: 'app-list',
  imports: [NgIf, NgFor, DatePipe, YesNoPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  readonly tasks = input.required<NewTaskValue[]>();

  readonly taskCompleted = output<NewTaskValue>();

  removeTask(task: NewTaskValue) {
    this.taskCompleted.emit(task);
  }

  transformToYesOrNo() {}
}
