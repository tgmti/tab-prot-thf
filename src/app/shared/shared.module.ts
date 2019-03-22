import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

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
  ]
})
export class SharedModule { }
