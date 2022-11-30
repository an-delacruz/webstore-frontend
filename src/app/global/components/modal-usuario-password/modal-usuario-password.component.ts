import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Loading, Notify } from 'notiflix';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-usuario-password',
  templateUrl: './modal-usuario-password.component.html',
  styleUrls: ['./modal-usuario-password.component.css'],
})
export class ModalUsuarioPasswordComponent implements OnInit {
  form = this.fb.group({
    old_password: ['', [Validators.required, Validators.minLength(8)]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    re_password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ModalUsuarioPasswordComponent>
  ) {}

  ngOnInit() {}
  onSubmit(form: any) {
    if (this.form.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      this.form.markAllAsTouched();
      return;
    }
    const data = {
      old_password: form.old_password,
      password: form.new_password,
      re_password: form.re_password,
    };
    Loading.circle('Updating User...', {
      svgColor: '#5c2b8a',
    });
    this.changePassword(data);
  }

  changePassword(data: any) {
    this.userService.changePassword(data).subscribe(
      (res: any) => {
        Notify.success('Password changed', {
          position: 'center-bottom',
        });
        this.dialogRef.close();
        Loading.remove();
      },
      (err: any) => {
        Notify.failure('Error changing password', {
          position: 'center-bottom',
        });
        Loading.remove();
      }
    );
  }
}
