import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OpenTodo } from '../common/todo.model';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  readonly submitted = output<OpenTodo>();

  readonly router = inject(Router);

  readonly form = new FormGroup({
    todoName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.email,
      ],
      nonNullable: true,
    }),
  });

  onSubmit(): void {
    this.submitted.emit(this.form.getRawValue());

    this.form.reset();
  }

  goToList(): void {
    this.router.navigate(['/list']);
  }
}
