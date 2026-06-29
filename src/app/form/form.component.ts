import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewTaskValue } from './form.models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  readonly submitted = output<NewTaskValue>();

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
}
