import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamsComponent } from './params/params.component';


const routes: Routes = [
  { path: 'params', component: ParamsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
