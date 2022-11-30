import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Loading, Notify } from 'notiflix';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css'],
})
export class ModalUsuarioComponent implements OnInit {
  form = this.fb.group({
    first_name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    last_name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ModalUsuarioComponent>
  ) {
    this.form.patchValue({
      ...data,
    });
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    if (this.form.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      this.form.markAllAsTouched();
      return;
    }
    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
    };
    Loading.circle('Updating User...', {
      svgColor: '#5c2b8a',
    });
    this.updateUser(data);
  }
  updateUser(data: any) {
    this.userService.updateUser(data).subscribe(
      (res) => {
        Notify.success('User updated', {
          position: 'center-bottom',
        });
        Loading.remove();
        this.dialogRef.close(true);
      },
      (err) => {
        Notify.failure('Error updating user', {
          position: 'center-bottom',
        });
        Loading.remove();
      }
    );
  }
}
