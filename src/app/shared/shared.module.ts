import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';
import { GenericListComponent } from './components/generic-list/generic-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThfModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ThfModule
  ],
  declarations: [GenericListComponent]
})
export class SharedModule { }
