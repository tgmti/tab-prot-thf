import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfPageDynamicSearchModule } from '@totvs/thf-templates';

import { SharedModule } from '../shared/shared.module';
import { ParamsListComponent } from './params-list/params-list.component';
import { ParamsRoutingModule } from './params-routing.module';
import { ParamsService } from './params.service';

@NgModule({
  declarations: [ParamsListComponent],
  imports: [
    CommonModule,
    ParamsRoutingModule,
    ThfPageDynamicSearchModule,
    SharedModule
  ],
  providers: [
    ParamsService
  ]
})
export class ParamsModule { }
