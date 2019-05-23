import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamsListComponent } from './params-list/params-list.component';

export const ParamsRoutes: Routes = [
  { path: '', component: ParamsListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ParamsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ParamsRoutingModule { }