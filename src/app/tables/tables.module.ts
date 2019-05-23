import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { TablesRoutingModule } from './tables-routing.module';
import { TableListComponent } from './table-list/table-list.component';


@NgModule({
  declarations: [TableListComponent],
  imports: [
    CommonModule,
    SharedModule,
    TablesRoutingModule
  ]
})
export class TablesModule { }
