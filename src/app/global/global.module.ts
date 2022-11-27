import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [CommonModule, MaterialModule],
})
export class GlobalModule {}
