import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  imports: [
    CommonModule,
    ThfModule
  ],
  exports: [
    CommonModule,
    ThfModule
  ]
})
export class SharedModule { }
