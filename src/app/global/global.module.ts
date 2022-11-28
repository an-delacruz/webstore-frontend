import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { MaterialModule } from '../material/material.module';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [NotfoundComponent, TruncatePipe],
  imports: [CommonModule, MaterialModule],
  exports: [NotfoundComponent, TruncatePipe],
})
export class GlobalModule {}
