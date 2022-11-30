import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { MaterialModule } from '../material/material.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUsuarioPasswordComponent } from './components/modal-usuario-password/modal-usuario-password.component';

@NgModule({
  declarations: [NotfoundComponent, TruncatePipe, ModalUsuarioComponent, ModalUsuarioPasswordComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [NotfoundComponent, TruncatePipe],
})
export class GlobalModule {}
