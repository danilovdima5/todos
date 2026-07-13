import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BaseTodo } from '../common/todo.model';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  readonly submitted = output<BaseTodo>();

  readonly router = inject(Router);

  readonly form = new FormGroup({
    taskName: new FormControl('', {
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
    this.submitted.emit(this.form.getRawValue() as any);

    this.form.reset();
  }

  goToList(): void {
    this.router.navigate(['/list']);
  }
}
